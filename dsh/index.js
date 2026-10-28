import Schema from '@deepseek-ai/schemastery'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createStaticHandler } from './server.js'
import { readFileSync } from 'node:fs'

export const name = 'myeloma-workbench-main'
export const inject = ['webServer', 'connection']
export const Config = Schema.object({})
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

export function apply(ctx) {
  if (!ctx.webServer?.register) throw new Error('Desktop webServer.register is unavailable')
  /* 业务界面：public/（原型提升而来）经 iframe 装进面板。
     注册用 UI_ROUTE（无尾斜杠），静态层剥前缀时两种形态都认。 */
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix', path: UI_ROUTE, handler: createStaticHandler(PUBLIC_DIR, UI_ROUTE),
  }), 'myeloma-workbench ui')
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
