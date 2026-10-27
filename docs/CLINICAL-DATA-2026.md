# 临床试验数据 2026（MM）

> 采集脚本：`scripts/fetch-myeloma-trials-2026.mjs`。数据读取与来源边界：`docs/35-TRIAL-MATCHING.md`。

## 当前快照

- 快照日期：2026-10-25。
- 检索口径：六个关键词，逐来源限制 200 条；详情见 `research/myeloma-cancer/manifest.json`。
- 本地 JSONL 与 SQLite 各有 257 条；manifest 记录 36 条来源终态行。逐文件摘要见 manifest。
- 当前工作副本 SQLite 来源汇总：`chictr_online`、`ictrp` 为 `FAILED`（上游未知错误）；`chictr_pancreatic_archive` 为 `NEEDS_SETUP`（路径缺失）；`chinadrugtrials` 与 `ctv` 在不同关键词查询出现 `SUCCESS` 及 `NO_RESULTS`；`xyb_chinadrugtrials_archive` 为 `NO_RESULTS`。完整逐查询状态、coverage 和 completeness 以 SQLite `source_statuses` 表为准。
- 这些是该快照采集时的历史终态，不代表当前在线查询状态。`FAILED`、`DENIED`、`NEEDS_SETUP`、超时或未配置来源不算“查过”，不计成功覆盖。`NO_RESULTS` 仅表示该次有限口径未返回记录，不证明不存在相关试验。

## 数据边界

当前 257 条快照记录主要包含标题、来源 ID、登记号、来源链接（部分来源只有通用列表地址）、抓取时间及 `snapshotDate`。缺少可用的入组/排除条件、当前招募状态、中心和充分的详细证据字段。不得按试验标题推断资格或招募状态，不得从别处补造快照字段。

界面逐条显示“登记状态，未核实”及快照日期。登记不等于有效、安全或可入组。临床候选呈现按项目 [35 号契约](35-TRIAL-MATCHING.md)：只有已确认且带来源日期的病理/细胞遗传/IHC 字段可参与**合成条件示例**对照；结构化、文本、宽口径检索证据分层展示；无法自动匹配的条件逐条说明。starter v2 允许合成示例演示粗筛符合度和四档标签，真实快照不计算比例、不作资格结论或综合匹配分。

## 演示呈现

真实快照仅演示本地检索、来源与日期。带条件证据的 `DEMO-MM-` 条目是合成示例，必须在列表和详情中标明“合成演示”，不能冒充注册库记录。未真实发起 MCP 在线查询时，来源终态区须标“演示状态，未发起实时查询”。

离线 ChiCTR/CDE/CTV 语料对 MM 当前无配置/覆盖，不能借用仅覆盖胰腺癌的语料。任何 0 条结果都保留来源 coverage/completeness 说明。

## 一致性与复核

- 2026-10-26 使用只读检查器核对原始快照：manifest 文件 SHA-256、recordCount/dbCount、JSONL 与 SQLite 主键及共享字段、SQLite `integrity_check`、source_statuses 数量和重复项。
- 原始 `research/myeloma-cancer/` 结果：JSONL 257 行、SQLite 257 条，主键集合一致；manifest 数量与 hash 一致；SQLite integrity 为 `ok`；来源状态 36 行且无重复键。49 条 CTV 记录 `sponsor` 与 SQLite `sponsors` 不一致（旧 SQLite 为 NULL），原快照字段验收未通过。原始目录保持不变。
- 2026-10-27 修正采集器字段映射，并从原始 JSONL 和来源状态表生成独立副本 `research/myeloma-cancer-20261027-corrected/`。`node scripts/check-trial-snapshot.mjs research/myeloma-cancer-20261027-corrected` 实测 `records=257/257 sourceStatuses=36`、PASS；新副本保留原快照日期 2026-10-25，并在 manifest 标明修正时间、来源目录和修正说明。此为字段映射修复，不是重新检索。
- 快照状态固定写“登记状态，未核实”；后续采集默认写入全新时间戳目录，目标已存在则拒绝覆盖；`--output-dir` 仅接受项目 `research/` 内的新路径。
- 原始研究材料仍保留；后续更新须先审阅采集口径和上游版本，不覆盖本说明所指历史证据。
