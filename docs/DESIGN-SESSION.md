# 互动设计记录

状态：M1/G1 范围仍待签认；继承已提供的目标用户、场景、核心流程和本轮临床匹配要求，不重复询问已知内容。

当前阶段/范围：M0 complete → M1 research/scenarios/specification（部分材料已有，待正式签认）→ M2 prototype in progress → G2 confirmation pending。

权威内容：`docs/BRIEF.md`、`docs/SPEC.md`、`docs/SCENARIOS.md`；用户本轮明确的临床规则整理在 `docs/35-TRIAL-MATCHING.md`；路径草案在 `docs/INTERACTION-DESIGN.md`。

| 决策 ID | 待解决的问题 | 用户已确认内容/来源 | Agent 建议及原因 | 待确认项 | 确认人/日期 | 影响功能 ID |
| --- | --- | --- | --- | --- | --- | --- |
| MM-D01 | 临床匹配的输出边界 | 用户 2026-10-26 指定 starter 最新要求：只用已确认入库基因/病理/IHC 字段；本地快照与在线通道分开；statuses 透传；FAILED/DENIED 不算查过；三层证据；无法自动匹配逐条说明；不产出“不适用”；禁数值综合分 | 按候选线索设计，不做入组资格判断 | 原型具体呈现版本/范围待 G2 评审 | 用户 / 2026-10-26（规则确认） | MM-TRIAL-01~04 |
| MM-D02 | 临床模块的交互参照 | 用户指定小胆宝 `prototypes/v0.2/index.html` | 借用导航、匹配/检索/收藏分层与条件证据结构；换成本病种字段、色彩和边界 | HTML 可用性与布局待实际预览确认 | 用户 / 2026-10-26（参考页确认） | MM-TRIAL-01~04 |
| MM-D03 | 当前快照能证明什么 | 本地 manifest 与 SQLite：2026-10-25，257 条；source_statuses 有 FAILED/NEEDS_SETUP/SUCCESS/NO_RESULTS | 快照用于真实检索展示；缺条件的真实记录不做患者匹配；在线状态演示须明确标为非实时 | M4 记录数/哈希一致性复核待做 | — | MM-TRIAL-02~04 |
| MM-D04 | M2 当前闭环 | 用户要求依据开发链路继续 M2，补上漏掉的临床 demo | 更新交互路径草案，制作可预览 HTML，保留 G1/G2 待确认状态 | 选定场景与一期总范围仍待 G1；原型范围待用户确认 | 用户 / 2026-10-26（继续 M2 授权） | M2 / prototype |

本轮已写入：项目 35 号临床契约、CLINICAL-DATA-2026 快照状态、S01–S13 场景路径与 M2 任务状态；待写原型并实际预览。

原型路径/版本/hash 与操作路线：待生成/预览后填入 `docs/PROTOTYPE-REVIEW.md`。

未确认：M1/G1 全量范围；原型用户体验与模块确认；M2/G2 X1–X4 走查；独立设计评审；Desktop 实机；M4 文件哈希一致性。

变更追踪：starter 旧版本曾含“粗筛符合度 pct/四档分组”语义；本项目按用户 2026-10-26 的更新要求，不再采用百分比/综合分或资格分组，详见 `docs/35-TRIAL-MATCHING.md`。
