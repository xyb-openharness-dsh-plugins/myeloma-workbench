# 变更记录

只增不删；每条写清"改了什么 + 为什么 + 用户可见结果"。版本号与 VERSION、package.json 三处必须一致。

## 2026-10-26 · M4 核验与 M9 本地经验回流（未提交）

- 新增只读 `scripts/check-trial-snapshot.mjs`，按 record_id 对照研究快照 manifest、JSONL、SQLite 数量/hash/共享字段及来源状态。
- 核验确认 257/257、hash、SQLite integrity 与 36 条来源状态结构一致；49 条 CTV 的 sponsor 字段未写入 SQLite，故 M4 字段一致性验收失败。原研究资料保持不变，差异列入交接，修复需新授权与新快照版本。
- Starter 1.10.0-rc.1 增加模板、初始化接线、回归测试与 M4/M9 文档经验；尚未发布或提交。Starter 的回流 commit 清单因当前禁止提交而未完成。

## 0.1.0 — 2026-10-25

- 由社区脚手架 dsh-wb-cli@1.5.3 (e98fba0) 初始化，仅有注册骨架与健康接口，无业务功能。
