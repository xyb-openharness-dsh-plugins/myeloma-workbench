import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = new URL('..', import.meta.url).pathname
const checker = join(root, 'scripts/check-trial-snapshot.mjs')
const hash = (value) => createHash('sha256').update(value).digest('hex')

async function snapshotFixture(t) {
  const rootDir = await mkdtemp(join(tmpdir(), 'myeloma-checker-'))
  t.after(() => rm(rootDir, { recursive: true, force: true }))
  const dataDir = join(rootDir, 'myeloma-cancer-20261027-corrected')
  await mkdir(dataDir)
  const record = { recordId: 'ctv:UTN0001', mergedSources: ['ctv:UTN0001'], sourceId: 'ctv', title: 'Trial', studyType: 'Interventional', sponsor: ['Sponsor A'], registryNumbers: [], dates: null, sourceUrl: null, retrievedAt: null, statusNote: '登记状态，未核实', snapshotDate: '2026-10-25' }
  const jsonl = JSON.stringify(record) + '\n'
  const jsonlName = 'trials.jsonl'
  const dbName = 'trials.sqlite'
  await writeFile(join(dataDir, jsonlName), jsonl)
  const db = new DatabaseSync(join(dataDir, dbName))
  db.exec('CREATE TABLE trials(record_id TEXT PRIMARY KEY,merged_sources TEXT NOT NULL,source_id TEXT NOT NULL,title TEXT,study_type TEXT,sponsors TEXT,registry_numbers TEXT,dates TEXT,source_url TEXT,retrieved_at TEXT,status_note TEXT NOT NULL,snapshot_date TEXT NOT NULL); CREATE TABLE source_statuses(query TEXT NOT NULL,source_id TEXT,state TEXT,reason_code TEXT,coverage TEXT,completeness TEXT,total_records INTEGER);')
  db.prepare('INSERT INTO trials VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').run(record.recordId, JSON.stringify(record.mergedSources), record.sourceId, record.title, record.studyType, JSON.stringify(record.sponsor), '[]', null, null, null, record.statusNote, record.snapshotDate)
  db.prepare('INSERT INTO source_statuses VALUES(?,?,?,?,?,?,?)').run('myeloma', 'ctv', 'SUCCESS', null, '{}', '{}', 1)
  db.close()
  const manifest = { recordCount: 1, dbCount: 1, sourceStatusRows: 1, files: { [jsonlName]: { sha256: hash(jsonl) }, [dbName]: { sha256: hash(await readFile(join(dataDir, dbName))) } } }
  await writeFile(join(dataDir, 'manifest.json'), JSON.stringify(manifest))
  return { rootDir, dataDir }
}

test('detects valid snapshots in timestamped project directories', async (t) => {
  const { rootDir, dataDir } = await snapshotFixture(t)
  const result = spawnSync(process.execPath, [checker, dataDir], { cwd: root, encoding: 'utf8', timeout: 20000 })
  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /PASS snapshot consistency/)
  const projectResult = spawnSync(process.execPath, [checker, rootDir], { cwd: root, encoding: 'utf8', timeout: 20000 })
  assert.equal(projectResult.status, 0, projectResult.stdout + projectResult.stderr)
})
