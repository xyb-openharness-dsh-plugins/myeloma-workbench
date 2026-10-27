#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectTrialMatching, runSelfTests, shouldCheckTrialMatching } from '../templates/check-trial-matching.mjs';

const root = resolve(process.argv.slice(2).find((arg) => !arg.startsWith('-')) || '.');
const self = runSelfTests();
for (const result of self) console.log(`${result.pass ? 'PASS' : 'FAIL'} self-test: ${result.name}`);
if (self.some((result) => !result.pass)) process.exitCode = 1;

const candidates = ['prototypes/v0.2/app.js'];
let triggered = false;
for (const relative of candidates) {
  const path = resolve(root, relative);
  let source;
  try { source = readFileSync(path, 'utf8'); }
  catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  if (!shouldCheckTrialMatching(source)) continue;
  triggered = true;
  const failures = inspectTrialMatching(source);
  for (const failure of failures) console.error(`FAIL ${relative}: ${failure}`);
  if (failures.length) process.exitCode = 1;
  else console.log(`PASS trial matching contract: ${relative}`);
}
if (!triggered && process.exitCode !== 1) console.log('SKIP trial matching contract: no implementation trigger found');
