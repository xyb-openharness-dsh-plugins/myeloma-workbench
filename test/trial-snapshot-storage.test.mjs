import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { flattenSourceStatuses, serializeTrialRecord, writeTrialSnapshot } from '../scripts/trial-snapshot-storage.mjs'

function tempRoot(t) {
  const root = mkdtempSync(join(tmpdir(), 'myeloma-trial-storage-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  return root
}

const source = {
  source: { id: 'ctv' },
  title: 'Example trial',
  studyType: 'Interventional',
  sponsorOrInstitution: ['Sponsor A'],
  registryNumbers: [{ registry: 'UTN', value: 'UTN0001', primary: true }],
  dates: { registered: '2026-01-01' },
  sourceUrl: 'https://example.test/trial',
  provenance: { retrievedAt: '2026-01-02T00:00:00Z' },
}

test('serializes sponsorOrInstitution to sponsor and stores it in SQLite sponsors', (t) => {
  const root = tempRoot(t)
  const row = serializeTrialRecord('ctv:UTN0001', ['ctv:UTN0001'], source, '2026-01-03')
  const statuses = flattenSourceStatuses([{ query: 'myeloma', statuses: [{ sourceId: 'ctv', state: 'SUCCESS' }], totalRecords: 1 }])
  const outDir = join(root, 'myeloma-cancer')
  const manifest = writeTrialSnapshot({
    outDir,
    records: [row],
    sourceStatuses: statuses,
    manifest: { topic: 'myeloma', year: '2026', snapshotDate: '2026-01-03' },
  })
  assert.equal(manifest.recordCount, 1)
  assert.equal(manifest.dbCount, 1)
  assert.equal(manifest.sourceStatusRows, 1)
  assert.deepEqual(JSON.parse(readFileSync(join(outDir, 'trials-2026.jsonl'), 'utf8')).sponsor, ['Sponsor A'])
  const db = new DatabaseSync(join(outDir, 'myeloma_cancer_trials_2026.sqlite'), { readOnly: true })
  t.after(() => db.close())
  assert.deepEqual(JSON.parse(db.prepare('SELECT sponsors FROM trials WHERE record_id=?').get('ctv:UTN0001').sponsors), ['Sponsor A'])
})

test('snapshot writer refuses to overwrite an existing output directory', (t) => {
  const root = tempRoot(t)
  const outDir = join(root, 'myeloma-cancer')
  mkdirSync(outDir)
  writeFileSync(join(outDir, 'keep.txt'), 'keep')
  assert.throws(() => writeTrialSnapshot({ outDir, records: [], sourceStatuses: [], manifest: {} }), /overwrite existing snapshot directory/i)
  assert.equal(readFileSync(join(outDir, 'keep.txt'), 'utf8'), 'keep')
})
