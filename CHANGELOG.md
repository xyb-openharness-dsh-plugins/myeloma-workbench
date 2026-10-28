# 变更记录

只增不删；每条写清"改了什么 + 为什么 + 用户可见结果"。版本号与 VERSION、package.json 三处必须一致。

## 0.1.1-rc.4 · 2026-10-28

- **修「装了整页空白」**：`dsh/index.js` 原先用带尾斜杠的 `UI_PREFIX`
  （`/api/myeloma-workbench/ui/`）当 `kind:'prefix'` 的注册路径。宿主
  `dsh-host-webserver` 的命中判据是 `pathname === prefix || pathname.startsWith(prefix + '/')`
  且**不重写 `req.url`**，于是只有 `/ui/` 本身命中，`/ui/app.js`、`/ui/style.css`
  落到宿主 SPA 兜底（返回 index.html）→ 浏览器把 HTML 当 JS/CSS 解析 → 业务区整片空白。
  新增 `UI_ROUTE = UI_PREFIX.replace(/\/+$/, '')` 专供注册；静态层新增
  `stripMountPrefix()`，剥前缀时带/不带尾斜杠两种形态都认。iframe 入口仍用带斜杠的 `UI_PREFIX`。
- 本地路由探针：`/api/myeloma-workbench/ui/` 200 `text/html`、`/ui/app.js` 200
  `text/javascript`、`/ui/style.css` 200 `text/css`、无尾斜杠形态 200、`..`/绝对路径逃逸 404、
  HEAD 200 空体。
- AI 会话面板（customFrame / Panel 接 conversation / 顶栏「AI 对话」/ aside 常挂载 /
  1px 分隔线 + 11px 热区 / 25%–45% 默认 35% 步进 2% / localStorage / 键盘 / 窄屏抽屉 /
  悬停品牌色发光 + ⠿ + 拖动遮罩）由 `scripts/check-ai-pane.mjs` 逐条断言，29/29 通过。
- 发布：tag `v0.1.1-rc.4`；Release 资产 `xyb-community-myeloma-workbench-0.1.1-rc.4.tgz` 与
  `SHA256SUMS-0.1.1-rc.4`，下载后可用 `shasum -a 256 -c` 校验。

## 0.1.1-rc.2 · 2026-10-27（本地候选，未发布）

- 装机界面补齐（评审反馈：装了只有骨架）：把 `prototypes/v0.2` 提升为 `public/` 并随包发出（`files += public`）；新增 `dsh/server.js`（只从 public/ 出文件，`..`/符号链接逃逸一律 404）与 `/api/myeloma-workbench/ui/` 前缀路由；`lib/client.js` 改为 iframe 装 public，原骨架降为加载失败兜底。

- 36 号 v2 引入（指南可点 + 状态卡）：新增 `prototypes/v0.2/primer-data.js`（四段 `definition → evidence → landscape → trend`）与 starter 模式层 `primer.js` / `primer.css`；原型顶栏「?」与看板疾病概要卡均打开四段整页浮窗。
- 指南链接 12 条候选入口逐条用 `verify-links.mjs` 实测：9 个唯一 URL 为 OK 并写入数据（19 个链接位），覆盖 NCCN 指南目录、IMWG、CSCO、WHO/IARC、NCI PDQ 与 SEER；NCCN 患者版 PDF 直链与 IMWG 2014 原始论文 DOI 实测仅返回二进制（THIN），未采用，相关行改标「未取得可核对原件，据二次来源」。未编 URL、未引用指南条文。
- 看板首卡按 §2.6 增加 D+N 状态卡四件：eyebrow、按锚点日（移植回输日 Day 0 / 诱导 D1）派生的大字天数、现状行、主按钮 + 「疾病概要：多发性骨髓瘤是什么？」副按钮；无锚点时显示「待初始化」并给出三步向导。
- 装机层 `lib/client.js` 内联同一份四段数据，加入「?」入口、返回/关闭/Esc、焦点回收与缺链接红标；`package.json.files` 已含 `lib`。
- 新增 `scripts/check-primer-links.mjs` 并接入 `npm run check`；新增 `scripts/probe-disease-primer.mjs`。原型探针 10/10，`npm run check` 通过。
- 本地候选 tarball 共 30 个文件，SHA-256 `40ad8a2ef29e10fea13d5d6795ba56a92c276969fee7cf445b537e6884725c94`；已重装到 DSH Desktop 0.12.0 app-owned `profiles/web`，安装副本 30/30 文件逐字节一致。旧同版本副本缺少 `dsh/server.js` 与 `public/`，通过卸载再安装修复。客户端注册与服务端静态路由 smoke test 通过；Desktop UI 因未重启目标应用仍待手动重启后核验。当前包仍为接入骨架，不含业务流程。未发布、未提交。

## 0.1.1-rc.1 · 2026-10-27（本地候选，未发布）

- 修正试验采集器的 sponsor 写库字段映射，并改为创建新时间戳快照目录；目标已存在时拒绝覆盖，避免破坏既有研究材料。
- 从原始 JSONL 与来源状态表生成独立的修正版 SQLite 快照；原始快照保持原样，修正版通过 257 条记录、36 条状态与逐字段/哈希检查。
- 增加快照检查器对时间戳命名目录的识别及回归测试；项目测试 7/7 通过，Starter 测试 66/66、204 项检查通过。
- 生成并安装到 DSH Desktop 0.12.0 app-owned `profiles/web` 的 tgz 共 22 个文件，SHA-256 `817a3c30be3a3e1a966ee024a6cab0570dff2fe86d94508508edb4c26e7226f9`；安装副本 22/22 文件字节一致。Desktop UI 因未重启目标应用而待手动重启后核验；当前包仍为接入骨架，不含业务流程。未发布、未提交。
- 项目完整 audit 为 21/30（8 fail / 1 warn），依赖尚未满足的 M5/G2/G3 工件及 Starter 当前未识别的扩展检查链，故候选不代表发布审计通过。

## 2026-10-26 · M4 核验与 M9 本地经验回流（未提交）

- 新增只读 `scripts/check-trial-snapshot.mjs`，按 record_id 对照研究快照 manifest、JSONL、SQLite 数量/hash/共享字段及来源状态。
- 核验确认 257/257、hash、SQLite integrity 与 36 条来源状态结构一致；49 条 CTV 的 sponsor 字段未写入 SQLite，故 M4 字段一致性验收失败。原研究资料保持不变，差异列入交接，修复需新授权与新快照版本。
- Starter 1.10.0-rc.1 增加模板、初始化接线、回归测试与 M4/M9 文档经验；尚未发布或提交。Starter 的回流 commit 清单因当前禁止提交而未完成。

## 0.1.0 — 2026-10-25

- 由社区脚手架 dsh-wb-cli@1.5.3 (e98fba0) 初始化，仅有注册骨架与健康接口，无业务功能。
