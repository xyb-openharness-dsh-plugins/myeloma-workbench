#!/usr/bin/env node
/* 版本与面板参数一致性：VERSION / package.json / lib/version.js / 页面字面量 / lib/layout.js。 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
const root = resolve(process.argv.includes('--root') ? process.argv[process.argv.indexOf('--root') + 1] : join(dirname(fileURLToPath(import.meta.url)), '..'))
const read = (p) => { try { return readFileSync(join(root, p), 'utf8') } catch { return '' } }
const version = read('VERSION').trim()
const fails = []; const oks = []
const pkg = JSON.parse(read('package.json') || '{}')
pkg.version === version ? oks.push(`package.json = ${version}`) : fails.push(`package.json = ${pkg.version}，VERSION = ${version}`)
const libV = read('lib/version.js').match(/export const version = '([^']+)'/)?.[1]
libV === version ? oks.push(`lib/version.js = ${version}`) : fails.push(`lib/version.js = ${libV ?? '（缺失）'}，VERSION = ${version}`)
for (const page of ['public/index.html']) {
  if (!existsSync(join(root, page))) continue
  const literals = [...new Set([...read(page).matchAll(/v(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)/g)].map((m) => m[1]))]
  const bad = literals.filter((v) => v !== version)
  bad.length ? fails.push(`${page} 版本字面量 ${bad.join(', ')} ≠ ${version}`) : oks.push(`${page} 字面量 = ${version}`)
}
try {
  const { CLIENT_LAYOUT } = await import(pathToFileURL(join(root, 'lib/layout.js')).href)
  const client = read('lib/client.js')
  const num = (n) => { const a = client.match(new RegExp(n + '\\s*=\\s*Number\\(\'([0-9.]+)\'\\)')); if (a) return Number(a[1]); const b = client.match(new RegExp('(?:^|[,\\s])' + n + '\\s*=\\s*([0-9.]+)')); return b ? Number(b[1]) : undefined }
  const checks = { AGENT_MIN: CLIENT_LAYOUT.agentPane.min, AGENT_MAX: CLIENT_LAYOUT.agentPane.max, AGENT_DEFAULT: CLIENT_LAYOUT.agentPane.default, AGENT_STEP: CLIENT_LAYOUT.agentPane.step, NARROW_BELOW: CLIENT_LAYOUT.agentPane.narrowBelowPx, DRAWER_MAX: CLIENT_LAYOUT.agentPane.drawerMaxPx }
  for (const [name, want] of Object.entries(checks)) {
    const got = num(name)
    got === undefined ? fails.push(`${name} 找不到`) : (got === want ? null : fails.push(`${name} = ${got}，layout 是 ${want}`))
  }
  if (!fails.length) oks.push('面板参数与 lib/layout.js 一致')
} catch (e) { fails.push('layout 校验失败：' + e.message) }
for (const o of oks) console.log('✓ ' + o)
for (const f of fails) console.error('✗ ' + f)
process.exit(fails.length ? 1 : 0)
