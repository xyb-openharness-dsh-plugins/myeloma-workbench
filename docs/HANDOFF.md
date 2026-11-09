# 工作交接 · 多发性骨髓瘤工作台 · 2026-10-27

## 当前状态

- 本轮疾病概要更新（2026-10-26）：README 恢复为唯一一套四段正文；指南、共识、WHO/IARC 分类、NCI/SEER 入口和访问状态同步到 README/`docs/DISEASE-PRIMER.md`；原型内补来源卡、治疗分类卡和四段目录。`node --check prototypes/v0.2/app.js` 与 `git diff --check` 通过。Starter 探针实跑 5/9，另 4 项因其要求 `.dp-*`/`window.DISEASE_PRIMER`、与项目现有 `#pageView`/内嵌 `primerView()` 不一致而不可判；未声称 P1–P8 通过。
- 仓库：`myeloma-workbench`；分支：`main`；当前包版本 `0.1.1-rc.2`（未发布）。M0 已完成；M1/G1 尚未签认；M2 HTML 草案已更新并完成部分浏览器走查，等待用户确认；M4 有原始与旁路修正版快照。
- 当前原型：`prototypes/v0.2/index.html`，其原型哈希未因本次包版本变化更新；项目 `VERSION`、`package.json` 和生成 demo 的可见版本为 `0.1.1-rc.2`。demo-data.js SHA-256：`b0790937bfbd5104aba343e688623d59168b326e3e8bd9661524f9a84e93377c`。既有 HTML/app.js/style.css 哈希仍见 `docs/PROTOTYPE-REVIEW.md`；本轮未改原型结构。
- 临床 snapshot：manifest 标 2026-10-25、257 条和 36 条来源终态行；界面按来源与状态/原因码呈现 8 组状态记录，并区分 queried、unavailable 与 notQueried。真实快照没有入组条件，不能支持真实结构化匹配或资格结论。
- 本轮验证：项目 `npm test` 7/7、`npm run check`、修正版快照检查、匹配合同断言和 `git diff --check` 通过。Starter 当前 `npm test` 66/66、`npm run check` 与 `check-starter` 204 项通过。项目 `npm run audit` 在 `release:check` 中 21/30（8 fail / 1 warn），缺少 M5/G2/G3 目标工件且 Starter 检查链模板未识别当前扩展命令；不能声称发布审计通过。`npm run check` 保留 config.root 与实际 tgz/Desktop UI 两项警告。
- 浏览器：2026-10-26 Playwright 本地预览通过；来源状态卡、合成收藏/待问问题、快照详情、深链刷新、应用返回、浏览器后退通过；390×844 下页面无横向溢出，控制台错误/警告均为 0。收藏和问题目前并列显示在同一子页，刷新会清除，待用户评审。
- 已补充 35 号项目契约、交互路径草案、S01–S13 场景标识和 DEV-PLAN/TASKS 状态。路径草案、原型均未取得 G1/G2 签认。
- 工作区已有未提交材料：`research-notes/`、`research/`、`scripts/fetch-myeloma-trials-2026.mjs`。这些既有用户资料保持不变。
- M4 原快照于 2026-10-26 只读核验发现 49 条 CTV 记录 JSONL 的 sponsor 有值而 SQLite sponsors 为 NULL。原始 `research/myeloma-cancer/` 未改。2026-10-27 修复写库字段后，从原 JSONL 和 source_statuses 生成旁路副本 `research/myeloma-cancer-20261027-corrected/`；记录 257/257、状态 36、主键/hash/integrity/逐字段均 PASS，非重采数据。检查器另修复时间戳快照目录识别并新增回归。
- M9 本地回流已在 Starter 写入只读检查器、初始化/项目 check 接线、正反例测试、ZERO-TO-DEV 与 FULL-CYCLE 规则、L40 和未发布 RC Changelog；当前 Starter `npm test` 66/66 通过，`npm run check` 与 `check-starter` 204 项无错误。首次自检发现 starter 疾病概要 CSS 资产清单 SHA/bytes 陈旧，已按 tracked 文件实测值更新 `assets/manifest.json`。
- Starter 本地回流改动清单（未提交）：`templates/check-trial-snapshot.mjs`、`test/trial-snapshot.test.mjs`、`test/starter.test.mjs`、`scripts/init.mjs`、`scripts/check-starter.mjs`、`assets/manifest.json`、`prompts/ZERO-TO-DEV.md`、`prompts/FULL-CYCLE-KICKOFF.md`、`docs/LESSONS.md`、`CHANGELOG.md`、`package.json`。Starter commit 清单尚未提交，M9 仍未关闭。
- Desktop 0.12.0 / macOS arm64：使用 app 自带 Harness 的 `profiles/web`，经 `.desktop-bin` runner 对 app-owned profile 卸载旧副本后，重新安装 `release/xyb-community-myeloma-workbench-0.1.1-rc.2.tgz`。包 SHA-256 `40ad8a2ef29e10fea13d5d6795ba56a92c276969fee7cf445b537e6884725c94`；RC2 tarball 30/30 文件均与 `node_modules/@xyb-community/myeloma-workbench` 安装副本逐字节一致，profile dependency 与 bundle 均登记。此前同版本旧安装目录缺少 `dsh/server.js` 和 `public/`；卸载重装后两者存在。客户端注册和服务端健康/UI 路由 smoke test 通过。手工安装无市场安装记录。安装有 peer 缺失/冲突警告，日志亦显示其他现有包有相同提示。
- UI 真机：`agent-browser --auto-connect tab` 未发现可附着的 Chrome 实例。按项目规则未重启 Desktop，故已确认的是 RC2 磁盘副本、profile 登记及入口 smoke test；Desktop 切换器入口和客户端面板渲染尚未验证。用户手动完整退出重开后，需再检查列表、入口、健康连接骨架。当前 `lib/client.js` 仍是接入骨架，因此不能以安装或 smoke test 称业务流程验收通过。
- M1/G1、M2/G2 未签认，M3/G3 与 M5 尚未开始。Starter M9 本地回流测试和 204 项自检通过，但因禁止提交，commit 清单条件未完成，M9 未关闭；M7 发布和 M8 外部状态回填未执行。

## 本轮边界

- HTML 是评审原型，所有患者档案与匹配条件使用合成资料；真实登记快照仅展示检索字段和来源状态。
- 原型里的在线来源状态如非实时 MCP 结果，必须标“演示状态，未发起实时查询”。
- 不计算数值综合匹配分或资格结论；只展示结构化/文本/宽口径证据和逐条“无法自动匹配”原因。
- 不据原型生成或冻结正式 schema/API，不接生产云服务，不宣称收藏持久化。

## 下一步

1. 先取得 G1 范围和 M2 原型版本/范围确认，完成 X1–X4 与独立设计评审；在此之前不冻结生产 schema 或进入业务实现。
2. 用户手动完整退出并重开 DSH Desktop 0.12.0 后，核验已重装的 RC2 是否出现在 Desktop 列表、能否打开健康连接骨架。记录截图和宿主异常；不要将骨架验收写成业务功能通过。
3. 后续开始 M5 时，以用户确认后的原型为合同实现业务 UI。M4 原始快照保持归档，旁路修正版和采集器映射测试已有验证。
4. Starter M9 本地回流及自检已完成，但提交清单条件仍未满足。当前不提交、不推送、不发布、不做外部投稿。

本轮已按最新授权安装 tarball；未提交、推送、发布或外部投稿。原始研究材料保持不变。
