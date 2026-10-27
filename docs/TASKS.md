# 实施任务与当前交接

规格版本：SPEC v0.1 草案；原型版本：M2 v0.2 草案；当前分支：main；包版本：0.1.0。Starter 回流候选：1.10.0-rc.1（仅本地，未发布）。

| ID | 业务单元 | 前置依赖 | 拥有文件/模块 | 实施/检查要求 | 证据 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| M1-01 | 研究与场景确认 | BRIEF / USER-RESEARCH | research-notes、SCENARIOS、SPEC、DESIGN-SESSION | 区分证据与设计假设；HVT B 级清零；范围签认 | 现有桌面研究笔记；未访谈 | 进行中 / G1 未签 |
| M1-02 | 交互路径 | M1-01 与 28 号合同 | INTERACTION-DESIGN | 场景路径、CRUD 双通道、IP1–IP10 验法；入口文案匹配原型 | M2 路径草案，待确认 | 草案已补 / 待 G1 |
| M2-01 | HTML 原型 | 路径草案；G1 尚未签认，沿本轮授权制作评审草案 | prototypes/v0.2、demo | 治疗线五块折叠卡、时间轴、日历、状态胶囊、病情介绍、双主体和手工/AI候选；不实现生产 API | 病情介绍已按 Starter 四段与来源要求补充；390/768/1280 视口和导航已走查；哈希与探针兼容性见评审记录 | 进行中 |
| M2-02 | 临床线索匹配展示 | 项目 35 号 v2 契约、M4 快照 | 原型 clinical routes、templates/check-trial-matching.mjs、scripts/check-trial-matching.mjs | 建档/检索/匹配结果；确认字段参与合成条件对照；快照来源透传；证据分层；合成粗筛百分比/四档；真实快照不算比例 | 断言器自测与 `npm run check` 通过；快照 manifest 日期 2026-10-25 | 原型已实现，待评审 |
| M2-03 | 预览与独立评审 | M2-01/02 | PROTOTYPE-REVIEW、DESIGN-REVIEW、PARITY | 实际打开、主要路径/窄宽/维护流程核对；独立评审对象需对准最终 hash；用户确认与审查分开记录 | 关键页和手工候选保存已走查；完整 X1–X4/键盘/月历/打印未验证 | 进行中 |
| M3-01 | 数据/API 合同 | M2 对应模块用户确认 | SCHEMA、API-CONTRACT、schema | 领域事实/来源/revision 稳定；页面读模型分离；sha256 冻结前复核 | 待 G3 | 待开始 |
| M4-01 | 试验快照核验 | unified-trial-mcp | research/myeloma-cancer、CLINICAL-DATA-2026、scripts/check-trial-snapshot.mjs | 只读核对 manifest/jsonl/sqlite、来源 statuses、覆盖声明及逐字段映射；保留现有采集材料 | `node scripts/check-trial-snapshot.mjs .`：257/257；主键、manifest 数量/hash、SQLite integrity、36 状态行通过；49 条 CTV sponsor→sponsors 为空。无 sponsor 之外的检查错误 | 未通过：字段映射缺陷，原快照未改 |
| M5-01 | 正式系统开发 | G2 + G3 | dsh/lib/schema/assets | HTML parity >98%；业务数据/API/错误恢复；临床在线查询接入真实 MCP | 未开始 | 待开始 |
| M6-01 | 装机与业务验收 | M5 V1 | 包 / Desktop Profile / ACCEPTANCE | 版本、实际加载、主流程三层证据 | 未开始；本轮禁止安装 | 待开始 |
| M9-01 | 临床快照核验经验回流 | M4 差异定位 | Starter 模板/提示词/Lessons/Changelog；项目检查器与验收文档 | 逐主键逐字段只读对照；发现差异后保护原快照；复用回归夹具 | Starter `npm test` 66/66、`npm run check` 通过；`check-starter` 202 项无错误；项目检查器复现 49 条 sponsor 差异 | 本地实现完成；禁止提交，回流提交项未完成 |

## 当前状态

- M0 完成；M1/G1 未签认；M2 原型调整进行中；M4 快照只读核验未通过（49 条 sponsor 字段映射差异）；M9 本地经验回流已实现但因禁止提交未关闭。
- M2 临床原型仅可显示真实快照字段与明确标注的合成匹配示例。在线来源若为静态演示必须写明未发起实时查询。
- 当前 HTML 评审草案已在 Playwright 本地打开；病情概要于 390/768/1280px 下无页面横向溢出，来源链接、章节内滚动、Esc/浏览器返回、焦点与非零首页滚动恢复已走查。临床三页、快照筛选、手工待核候选创建与主体切换此前已走查；浏览器确认对话被取消，未改变演示事实。
- 当前文件哈希和已完成/未完成检查记入 `docs/PROTOTYPE-REVIEW.md`。完整 X1–X4、月历/键盘/打印核对、独立评审对准最新哈希和用户确认仍未完成；未确认项不进入正式业务代码。
- 未提交的 `research/`、`research-notes/`、`scripts/fetch-myeloma-trials-2026.mjs` 保留。

## 下一步具体动作

后续先由用户确认具体原型版本与范围，完成尚缺的 M2/X1–X4 与独立评审后再进入 G2；G1/G2 未签认前不冻结生产 schema。M4 差异修复需单独授权，保留当前 JSONL/SQLite/manifest，并以新版本快照交付后重新运行检查器。M9 本地检查和 Starter 自检均已完成；Starter 回流 commit 清单因本轮禁止提交而未完成。
