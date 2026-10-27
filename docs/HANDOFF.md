# 工作交接 · 多发性骨髓瘤工作台 · 2026-10-26

## 当前状态

- 本轮疾病概要更新（2026-10-26）：README 恢复为唯一一套四段正文；指南、共识、WHO/IARC 分类、NCI/SEER 入口和访问状态同步到 README/`docs/DISEASE-PRIMER.md`；原型内补来源卡、治疗分类卡和四段目录。`node --check prototypes/v0.2/app.js` 与 `git diff --check` 通过。Starter 探针实跑 5/9，另 4 项因其要求 `.dp-*`/`window.DISEASE_PRIMER`、与项目现有 `#pageView`/内嵌 `primerView()` 不一致而不可判；未声称 P1–P8 通过。
- 仓库：`myeloma-workbench`；分支：`main`；包版本 `0.1.0`。M0 已完成；M1/G1 尚未签认；M2 HTML 草案已更新并完成部分浏览器走查，等待用户确认；M4 已有 2026-10-25 快照。
- 当前原型：`prototypes/v0.2/index.html`，版本 v0.1.0。最新 SHA-256：HTML `818d26ddc26d8dd37adaddc615fb9f585e7b3489b1b64103048939714ab6b076`；app.js `16bb8bc693d4e0804623c6a7fa731058c8b6df3f513e279f0fd17bb056263fdf`；style.css `8d37f811d1be27f3272f8d7f9c214affb429acd8fdc32591ea21add40ec4c495`；demo-data.js `243c6c99fd92478faa8aca9574f313d8a712b4edaedfcb0f53783bded408a319`。疾病概要卡、顶栏「?」、四段浮窗及来源链接已按 Starter 36 号补充；三档视口与返回/关闭/链接行为记录见 `docs/PROTOTYPE-REVIEW.md`、`docs/PARITY.csv` 和 `docs/DISEASE-PRIMER.md`。
- 临床 snapshot：manifest 标 2026-10-25、257 条和 36 条来源终态行；界面按来源与状态/原因码呈现 8 组状态记录，并区分 queried、unavailable 与 notQueried。真实快照没有入组条件，不能支持真实结构化匹配或资格结论。
- 检查：独立审查修复后，`node --check`（原型 JS 与生成脚本）、`node scripts/check-trial-matching.mjs .`、`npm run check`、`git diff --check` 均通过；生成器重建后 SQLite 可读，含 2 个档案、48 条快照摘录与 8 组状态记录。npm 检查仍有 config.root 和打包/桌面核验两条警告；未运行测试套件或 Desktop 安装核验。
- 浏览器：2026-10-26 Playwright 本地预览通过；来源状态卡、合成收藏/待问问题、快照详情、深链刷新、应用返回、浏览器后退通过；390×844 下页面无横向溢出，控制台错误/警告均为 0。收藏和问题目前并列显示在同一子页，刷新会清除，待用户评审。
- 已补充 35 号项目契约、交互路径草案、S01–S13 场景标识和 DEV-PLAN/TASKS 状态。路径草案、原型均未取得 G1/G2 签认。
- 工作区已有未提交材料：`research-notes/`、`research/`、`scripts/fetch-myeloma-trials-2026.mjs`。这些既有用户资料保持不变。
- M4 于 2026-10-26 用只读 `scripts/check-trial-snapshot.mjs` 核验：257/257 记录、manifest 文件数与 SHA-256、主键集合、SQLite integrity、36 条 source_statuses 结构均通过；49 条 CTV 记录 JSONL 的 sponsor 有值而 SQLite sponsors 为 NULL，逐字段检查失败，M4 未通过。原研究快照、manifest、JSONL、SQLite 与采集脚本均未修改。
- M9 本地回流已在 Starter 写入只读检查器、初始化/项目 check 接线、正反例测试、ZERO-TO-DEV 与 FULL-CYCLE 规则、L40 和未发布 RC Changelog；最终 `npm test` 66/66 通过，`npm run check` 通过，`check-starter` 202 项无错误。首次自检发现 starter 疾病概要 CSS 资产清单 SHA/bytes 陈旧，已按 tracked 文件实测值更新 `assets/manifest.json`。
- Starter 本地回流改动清单（未提交）：`templates/check-trial-snapshot.mjs`、`test/trial-snapshot.test.mjs`、`test/starter.test.mjs`、`scripts/init.mjs`、`scripts/check-starter.mjs`、`assets/manifest.json`、`prompts/ZERO-TO-DEV.md`、`prompts/FULL-CYCLE-KICKOFF.md`、`docs/LESSONS.md`、`CHANGELOG.md`、`package.json`。Starter commit 清单尚未实际提交；当前明确禁止提交，因此 M9 仍未关闭。
- 项目新增只读检查器和 M4/M9 验收记录；M1/G1、M2/G2 未签认，M3/G3 与 M5 尚未开始，M6/M7/M8 未执行。M9 不能关闭：当前限制禁止提交，Starter 清单中的回流 commit 项待另行授权。

## 本轮边界

- HTML 是评审原型，所有患者档案与匹配条件使用合成资料；真实登记快照仅展示检索字段和来源状态。
- 原型里的在线来源状态如非实时 MCP 结果，必须标“演示状态，未发起实时查询”。
- 不计算数值综合匹配分或资格结论；只展示结构化/文本/宽口径证据和逐条“无法自动匹配”原因。
- 不据原型生成或冻结正式 schema/API，不接生产云服务，不宣称收藏持久化。

## 下一步

1. 按现有交互流程取得 G1 范围签认与 M2 原型版本/范围确认，补齐 X1–X4 和独立设计评审；在此之前不冻结 schema 或进入正式业务实现。
2. M4 49 条 sponsor 映射差异待单独授权修复。保留当前 JSONL/SQLite/manifest，修复需写为新的版本快照并重新运行 `node scripts/check-trial-snapshot.mjs .`。
3. Starter M9 本地回流与自检已完成；如后续允许提交，再补实际 commit 清单。M6/M7/M8 仍依照安装、发布和外部投稿限制保持未执行。

没有执行提交、推送、安装、发布或外部投稿。
