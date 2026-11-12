import Schema from '@deepseek-ai/schemastery'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createStaticHandler } from './server.js'
import { readFileSync } from 'node:fs'
import { Workbench } from './workbench.js'
import { isAbsolute } from 'node:path'

export const name = 'myeloma-workbench-main'
export const inject = ['webServer', 'connection']
export const Config = Schema.object({
  root: Schema.string().description('用户资料目录（cordis.patch.yml 的 dshHomePath 注入；缺省时空串表示未接线）'),
})
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

export const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
/** 界面入口（外壳 iframe 用的带尾斜杠形态）。 */
export const UI_PREFIX = '/api/myeloma-workbench/ui/'
/**
 * 路由注册用的前缀：**必须去掉尾斜杠**。
 * 宿主 dsh-host-webserver 的 prefix 命中判据是
 * `pathname === prefix || pathname.startsWith(prefix + '/')`，且不重写 req.url；
 * 若拿 '/api/myeloma-workbench/ui/' 去注册，只有 `/ui/` 本身能命中，
 * `/ui/app.js`、`/ui/style.css` 会落到宿主 SPA 兜底（回 index.html）→
 * 浏览器把 HTML 当 JS/CSS 解析 → 装机后业务区整片空白。
 * 本地 dev-server 挂在根上，永远看不见这一条。
 */
export const UI_ROUTE = UI_PREFIX.replace(/\/+$/, '')

/** 资料目录口径（与面板同一条规则，服务端再判一遍）。拒绝必须给人话理由。 */
export function checkDataDir(raw) {
  const dir = String(raw || '').trim()
  if (!dir) return { ok: false, reason: '目录为空' }
  if (!isAbsolute(dir)) return { ok: false, reason: '请选择绝对路径' }
  const homeExact = /^(\/Users\/[^/]+|\/home\/[^/]+|\/root|[A-Za-z]:\\Users\\[^\\]+)$/i
  if (homeExact.test(dir)) return { ok: false, reason: '主目录本身不作为资料目录，请在下面建一个专用文件夹' }
  if (/(Desktop|桌面)$/i.test(dir)) return { ok: false, reason: '桌面不作为资料目录' }
  if (/(Downloads?|下载(夹)?)$/i.test(dir)) return { ok: false, reason: '下载根目录不作为资料目录' }
  if (/^(\/tmp|\/private\/tmp|\/var\/folders\/|\/private\/var\/folders\/)/i.test(dir)) return { ok: false, reason: 'tmp 不作为资料目录（会被系统清理）' }
  return { ok: true, dir }
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk) => { if (raw.length < 64 * 1024) raw += chunk })
    req.on('end', () => { try { resolve(JSON.parse(raw || '{}')) } catch { resolve({}) } })
    req.on('error', () => resolve({}))
  })
}

export function apply(ctx, config = {}) {
  if (!ctx.webServer?.register) throw new Error('Desktop webServer.register is unavailable')
  /* 业务界面：public/（原型提升而来）经 iframe 装进面板。
     注册用 UI_ROUTE（无尾斜杠），静态层剥前缀时两种形态都认。 */
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix', path: UI_ROUTE, handler: createStaticHandler(PUBLIC_DIR, UI_ROUTE),
  }), 'myeloma-workbench ui')
  /* 数据层：config.root 注入才有 sqlite；没注入时 health 如实降级（不冒充已接通） */
  let workbench = null
  if (typeof config?.root === 'string' && config.root.trim() !== '') {
    workbench = new Workbench({ root: config.root })
    workbench.open()
    ctx.effect(() => workbench.close(), 'myeloma-workbench store close')
  }

  const apiBase = '/api/myeloma-workbench/api'
  const send2 = (res, status, body) => {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
    res.end(JSON.stringify(body))
  }
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix', path: apiBase,
    async handler(req, res) {
      const rejection = ctx.connection?.requestRejection?.(req)
      if (rejection !== undefined) return send2(res, rejection.status ?? 401, { error: 'Authentication required' })
      const url = new URL(req.url, 'http://local')
      const p = url.pathname
      try {
        if (!workbench) {
          if (p === apiBase + '/health') return send2(res, 200, { ok: true, storage: { ready: false, reason: 'config.root 未注入' } })
          return send2(res, 503, { error: '数据层未接线', detail: 'cordis.patch.yml 需要 config.root: !!js dshHomePath(...)' })
        }
        if (p === apiBase + '/health') return send2(res, 200, { ok: true, storage: { ready: true, dir: workbench.dataRoot }, version: manifest.version })
        if (p === apiBase + '/subjects' && req.method === 'GET') return send2(res, 200, { records: workbench.listSubjects() })
        if (p === apiBase + '/subjects' && req.method === 'POST') {
          const body = await readBody(req)
          return send2(res, 200, services_create(workbench, body))
        }
        if (p === apiBase + '/subjects' && req.method === 'DELETE') {
          return send2(res, 200, workbench.deleteSubject(url.searchParams.get('profileKey') || ''))
        }
        if (p === apiBase + '/root' && req.method === 'GET') return send2(res, 200, { dir: workbench.dataRoot })
        if (p === apiBase + '/root' && req.method === 'POST') {
          const body = await readBody(req)
          const verdict = checkDataDir(body?.dir)
          if (!verdict.ok) return send2(res, 400, { error: verdict.reason, dir: workbench.dataRoot })
          return send2(res, 200, { dir: workbench.setDataRoot(body.dir) })
        }
        return send2(res, 404, { error: 'Unknown API route' })
      } catch (error) {
        return send2(res, 400, { error: 'request failed', detail: String(error.message || error) })
      }
    },
  }), 'myeloma-workbench api')

  function services_create(wb, body) {
    const made = wb.createSubject(body || {})
    return { ...made, records: wb.listSubjects() }
  }

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact', path: '/api/myeloma-workbench/health',
    handler(req, res) {
      const send = (status, body) => {
        res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
        res.end(JSON.stringify(body))
      }
      if (typeof ctx.connection?.requestRejection !== 'function') return send(503, { error: 'connection authentication capability unavailable' })
      const rejection = ctx.connection.requestRejection(req)
      if (rejection !== undefined) return send(rejection, { error: 'Authentication required' })
      if (req.method !== 'GET') return send(405, { error: 'Method not allowed' })
      send(200, { ok: true, version: manifest.version, apiVersion: 'v1', capabilities: ['health'] })
    },
  }), 'myeloma-workbench health')
}
