#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'
import { basename, relative, resolve } from 'node:path'
import { writeTrialSnapshot } from './trial-snapshot-storage.mjs'

const [sourceArg, destinationArg] = process.argv.slice(2)
if (!sourceArg || !destinationArg) {
  console.error('Usage: node scripts/copy-corrected-trial-snapshot.mjs <source-snapshot-dir> <new-snapshot-dir>')
  process.exit(2)
}

const projectRoot = resolve(import.meta.dirname, '..')
const source = resolve(sourceArg)
const destination = resolve(destinationArg)
const researchRoot = resolve(projectRoot, 'research')
const sourceRelative = relative(researchRoot, source)
const destinationRelative = relative(researchRoot, destination)
if (sourceRelative.startsWith('..') || destinationRelative.startsWith('..') || destinationRelative === '') {
  throw new Error('Source and new snapshot directory must both be inside project research/, and destination cannot be research/ itself')
}
if (source === destination || destination.startsWith(source + '/') || source.startsWith(destination + '/')) {
  throw new Error('Source and destination snapshot directories must be separate siblings')
}
if (existsSync(destination)) throw new Error(`Destination already exists; refusing to overwrite: ${destination}`)

const manifestPath = resolve(source, 'manifest.json')
const sourceManifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const jsonlName = Object.keys(sourceManifest.files ?? {}).find((name) => name.endsWith('.jsonl'))
const dbName = Object.keys(sourceManifest.files ?? {}).find((name) => name.endsWith('.sqlite') || name.endsWith('.db'))
if (!jsonlName || !dbName) throw new Error('Source manifest must list one JSONL and one SQLite file')
const records = readFileSync(resolve(source, jsonlName), 'utf8').split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line))
const db = new DatabaseSync(resolve(source, dbName), { readOnly: true })
let statuses
try {
  statuses = db.prepare('SELECT query,source_id,state,reason_code,coverage,completeness,total_records FROM source_statuses ORDER BY rowid').all().map((row) => ({
    query: row.query,
    source_id: row.source_id,
    state: row.state,
    reason_code: row.reason_code,
    coverage: row.coverage,
    completeness: row.completeness,
    total_records: row.total_records,
  }))
} finally {
  db.close()
}

const manifest = writeTrialSnapshot({
  outDir: destination,
  records,
  sourceStatuses: statuses,
  manifest: {
    ...sourceManifest,
    correctedAt: new Date().toISOString(),
    correctedFrom: {
      directory: basename(source),
      files: sourceManifest.files,
    },
    correction: 'Rebuilt SQLite from the preserved JSONL; mapped JSONL sponsor to SQLite sponsors.',
  },
})
console.log(JSON.stringify({ destination, records: manifest.recordCount, sourceStatuses: manifest.sourceStatusRows, snapshotDate: manifest.snapshotDate }, null, 2))
