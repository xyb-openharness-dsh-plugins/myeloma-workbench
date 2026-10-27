# 变更记录

只增不删；每条写清"改了什么 + 为什么 + 用户可见结果"。版本号与 VERSION、package.json 三处必须一致。

## 0.1.1-rc.2 · 2026-10-27（本地候选，未发布）

- 36 号 v2 引入（指南可点 + 状态卡）：新增 `prototypes/v0.2/primer-data.js`（四段 `definition → evidence → landscape → trend`）与 starter 模式层 `primer.js` / `primer.css`；原型顶栏「?」与看板疾病概要卡均打开四段整页浮窗。
- 指南链接 12 条候选入口逐条用 `verify-links.mjs` 实测：9 个唯一 URL 为 OK 并写入数据（19 个链接位），覆盖 NCCN 指南目录、IMWG、CSCO、WHO/IARC、NCI PDQ 与 SEER；NCCN 患者版 PDF 直链与 IMWG 2014 原始论文 DOI 实测仅返回二进制（THIN），未采用，相关行改标「未取得可核对原件，据二次来源」。未编 URL、未引用指南条文。
- 看板首卡按 §2.6 增加 D+N 状态卡四件：eyebrow、按锚点日（移植回输日 Day 0 / 诱导 D1）派生的大字天数、现状行、主按钮 + 「疾病概要：多发性骨髓瘤是什么？」副按钮；无锚点时显示「待初始化」并给出三步向导。
- 装机层 `lib/client.js` 内联同一份四段数据，加入「?」入口、返回/关闭/Esc、焦点回收与缺链接红标；`package.json.files` 已含 `lib`。
- 新增 `scripts/check-primer-links.mjs` 并接入 `npm run check`；新增 `scripts/probe-disease-primer.mjs`。原型探针 10/10，`npm run check` 通过。

## 2026-10-26 · M4 核验与 M9 本地经验回流（未提交）

- 新增只读 `scripts/check-trial-snapshot.mjs`，按 record_id 对照研究快照 manifest、JSONL、SQLite 数量/hash/共享字段及来源状态。
- 核验确认 257/257、hash、SQLite integrity 与 36 条来源状态结构一致；49 条 CTV 的 sponsor 字段未写入 SQLite，故 M4 字段一致性验收失败。原研究资料保持不变，差异列入交接，修复需新授权与新快照版本。
- Starter 1.10.0-rc.1 增加模板、初始化接线、回归测试与 M4/M9 文档经验；尚未发布或提交。Starter 的回流 commit 清单因当前禁止提交而未完成。

## 0.1.0 — 2026-10-25

- 由社区脚手架 dsh-wb-cli@1.5.3 (e98fba0) 初始化，仅有注册骨架与健康接口，无业务功能。
