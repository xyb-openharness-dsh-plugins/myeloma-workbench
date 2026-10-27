# 疾病概要 · 多发性骨髓瘤

> 本项目实例文件，由 `xyb-workbench-starter` 的 `templates/DISEASE-PRIMER.md` 复制而来。
> 规范：`docs/36-DISEASE-PRIMER.md`。四段固定、顺序不变，缺段不合格；填不了的写「本台尚未整理」，**不许删段**。

- 项目 / 品牌：多发性骨髓瘤患者工作台（@xyb-community/myeloma-workbench）
- 病种：多发性骨髓瘤（Multiple Myeloma，MM）
- 最后更新：2026-10-26（链接状态复核与内容补充）
- 数据文件：当前四段内容嵌入 `prototypes/v0.2/app.js` 的 `primerView()` 原型整页中；尚未拆分为 `window.DISEASE_PRIMER` 数据文件
- README 对应段：`## 疾病概要`

## 0 原件与链接状态（本项目的前提）

2026-10-26 按 starter `prompts/PRIMER-BACKFILL.md` 检索并核对了机构页面类型；搜索到入口不等于取得或审阅指南原件。NCCN 患者版 PDF 的具体版本无法从当前 PDF 解析结果确认；专业版正文可能要求登录，官方目录索引可见 Multiple Myeloma Version 2.2027，但本项目未取得或核验该版本正文。IMWG 诊断标准页面是 IMF 托管摘要，另附 2014 年 DOI 入口；风险分层摘要对应的原始论文为 2014 年。CSCO 官方页面是指南汇编获取信息和会议解读回放，不等于多发性骨髓瘤指南全文。WHO/IARC 分类页可见分类层级；第五版第 11 卷出版信息为 2024 年，完整内容通过图书或订阅服务访问。NCI PDQ 为美国语境二次资料（标注 2025-04-25 更新）；SEER 年龄数据仅代表美国统计期 2019–2023。

| 机构/资料 | 可点击入口 | 状态与限制 |
|---|---|---|
| NCCN 患者版 Multiple Myeloma | [官方患者指南 PDF](https://www.nccn.org/patients/guidelines/content/PDF/myeloma-patient.pdf) | 官方 PDF 地址；本次未能读取 PDF 正文，版次与日期未核实，不能当作已审阅原件。 |
| NCCN 专业指南 | [官方指南目录](https://www.nccn.org/guidelines/category_1) | 官方目录可访问，页面索引可见 Multiple Myeloma 条目；此处记录到 Version 2.2027，但本项目未取得/核验该版本正文，专业访问可能要求登录。 |
| IMWG 诊断标准 | [IMF 托管的公开摘要](https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma) · [2014 原始论文 DOI](https://doi.org/10.1016/S1470-2045(14)70442-5) | 摘要页指向 2014 年原始标准；DOI 是出版方入口，全文访问可能受订阅限制。 |
| IMWG 风险分层 | [IMF 托管摘要](https://www.myeloma.org/imwg/imwg-consensus-risk-stratification-multiple-myeloma) | 摘要指向 2014 年 Leukemia 论文；不是个人风险判断工具。 |
| CSCO | [2025 指南汇编信息](https://www.csco.org.cn/cn/ncontent.aspx?oid=9038) · [骨髓瘤指南更新解读回放](https://reg2023.csco.org.cn/wap/resource/36?type=2) | 官方订购/获取页面与会议解读回放；均未提供本项目所列指南的完整原文。 |
| WHO/IARC | [在线造血与淋巴肿瘤分类](https://whobluebooks.iarc.who.int/structures/haematolymphoid/) · [第五版第 11 卷出版信息](https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024) | 2024 年第 5 版 Volume 11；分类层级可查看，完整出版内容通过图书或订阅访问；不是治疗指南。 |
| NCI / SEER 人群背景 | [NCI PDQ](https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq) · [SEER Myeloma Stat Facts](https://seer.cancer.gov/statfacts/html/mulmy.html) | 二次资料。PDQ 标注 2025-04-25 更新；SEER 诊断中位年龄 69 岁，统计期 2019–2023，仅为美国人群统计。 |

页码：本项目没有取得可核对的完整指南原件，均不填写页码。链接只代表来源入口已核对，不代表临床内容已经逐条审核。


## 1 定义（`definition`）

多发性骨髓瘤（MM）是克隆性浆细胞在骨髓内增殖的血液系统肿瘤，属浆细胞疾病谱。同一谱系还有两种前驱状态：意义未明的单克隆丙种球蛋白病（MGUS）与冒烟型（无症状）骨髓瘤；三者按「有没有靶器官损害」这条线区分。

- **CRAB 框架**：血钙升高（C）、肾功能不全（R）、贫血（A）、骨病变（B）。文献里的诊断框架还把骨髓克隆性浆细胞比例、受累 / 未受累游离轻链比值、影像学发现（常合称 SLiM 指标）并进来。
- **分期与危险度是两层，不是两套并列评分**：
  - ISS：β2-微球蛋白 + 白蛋白，分三期；
  - R-ISS：在 ISS 基础上加入 LDH 与细胞遗传学信息；
  - del(17p)、t(4;14)、t(14;16) 这类细胞遗传学异常是 R-ISS 的**输入变量之一**，本台单列为「细胞遗传学结果」字段，不写成第三套分期，也不据此写预后。
- **类型**：按重链分 IgG 型、IgA 型、轻链型等。轻链型只分泌游离轻链，血清蛋白电泳可能看不到 M 峰——所以本台把 FLC 单独做趋势。
- **本台只记原文**：诊断名称、分期、细胞遗传学结果都照医生 / 报告原文抄录，标注「未核对 / 已核对」，不自行换算、不推断。

**来源**：IMWG · 骨髓瘤诊断标准（CRAB 与 SLiM 指标）· 版本未核实 · 未取得原件，据二次来源 · 页码待核 ｜ IMWG · ISS / R-ISS 分期 · 版本未核实 · 未取得原件，据二次来源 · 页码待核 ｜ 本项目 `docs/BRIEF.md` · 一手项目文件

## 2 医学资料规范和指南情况（`evidence`）

| 机构 | 文件 | 版本 / 年份 | 原件 | 本台的用途 |
|---|---|---|---|---|
| NCCN | Guidelines for Patients: Multiple Myeloma | 官方 PDF 地址；具体版次未核实 | PDF 正文未读取，未取得可核对原件 | 患者版疾病与治疗信息入口；本台不引未核实条文 |
| NCCN | NCCN Clinical Practice Guidelines in Oncology: Multiple Myeloma | 官方目录索引可见 Version 2.2027；正文未核 | 专业版正文未取得，可能需要登录 | 专业指南入口；引用前需确认正文版本与更新日期 |
| IMWG | Criteria for the Diagnosis of Multiple Myeloma | IMF 摘要对应的原始标准发表于 2014 年 | 摘要为二次来源；另有 DOI 出版方入口，全文访问可能受限 | CRAB、SLiM 与浆细胞疾病诊断框架入口 |
| IMWG | Consensus recommendations for risk stratification in multiple myeloma | 原始论文 2014；在线摘要页未标版本 | IMF 托管摘要已链接，原文全文可能受限 | 仅说明风险分层资料来源，不推导个人风险 |
| CSCO | 2025 指南汇编信息与骨髓瘤更新解读回放 | 汇编信息页发布于 2026-05-06；会议回放标注 2025 | 官方获取信息与会议回放；未取得指南全文 | 仅作获取入口和解读资料，不引指南条文 |
| WHO / IARC | WHO Classification of Tumours Online: Haematolymphoid Tumours | 第 5 版 Volume 11；2024 | 在线分类层级可查看；完整出版内容未取得 | 疾病分类入口，不是治疗指南 |
| NCI | Myeloma Treatment (PDQ), Health Professional Version | 最近更新 2025-04-25 | 公开二次资料 | 补充美国语境疾病背景与治疗类别，不替代本地指南 |
| SEER | Cancer Stat Facts: Myeloma | 统计期 2019–2023 | 公开美国人群统计 | 人群背景示例，不外推到个人或其他地区 |

- 一台一表，不合并；未取得原件的必须标出来。
- 分期（ISS / R-ISS）与细胞遗传学结果在表里是两行、两个用途，**本表不做换算、不合成「综合危险度」**。

**来源**：见上表逐行。

## 3 目前治疗全景概要（`landscape`）

按治疗阶段与线序分组，只列类别，不含剂量、疗程与选择条件。

### 3.1 诱导治疗（初治）

- 蛋白酶体抑制剂、免疫调节剂、抗 CD38 单抗三类药物的联合方案，以及传统化疗，被列为诱导阶段的类别。
- 是否走自体移植路线，由医生按年龄、体能状态与合并情况判断；本台不提供「该不该移植」的结论。

### 3.2 自体造血干细胞移植

- 适合移植者的一个治疗环节。本台只记关键节点日期（采集、回输、植入）与当时原文，不评价移植效果。

### 3.3 维持治疗

- 诱导或移植之后的长期给药类别。给药时长与药物选择属医生判断。

### 3.4 复发 / 难治

- 换用未使用过的药物类别、参加临床研究、细胞治疗与双特异性抗体类被列为可选类别之一（国内获批状态与可及性**需单独核实**）。

### 3.5 支持治疗与贯穿全程

- 骨保护（双膦酸盐 / 地舒单抗类别）、感染预防与疫苗、肾功能相关处理、贫血与血钙的处理类别。本工作台不生成个体处置建议。
- 复查：M 蛋白、游离轻链、血常规、血钙 / 肌酐及影像等检查依临床安排；本台只记数值、日期、单位、来源与方法，不自动判断进展。

**固定出口（原话照抄）**：

> 以上是文献与指南里列出的手段，按病期与线序排列，不代表任何一项适合你。选哪一个，这一句需要问你的医生。

**来源**：NCCN · NCCN Guidelines · Multiple Myeloma（版本未核实）· 未取得原件，据二次来源 · 页码待核 ｜ CSCO · 浆细胞疾病诊疗指南（版本未核实）· 未取得原件 · 页码待核

## 4 发展趋势（`trend`）

只写已发生的事实，每条带日期或版本号。

1. 截至 2026-10-25：本项目在 `unified_search_trials` 按 6 个检索词（多发性骨髓瘤 / 骨髓瘤 / 浆细胞瘤 / multiple myeloma / myeloma / plasma cell myeloma）采集到登记记录 257 条，快照与检索式见 `research/myeloma-cancer/manifest.json`。**口径**：单平台、指定检索式、快照日 2026-10-25，不是全量统计；I / II / III 期分布未统计，登记状态一律「未核实」。
2. 指南版本更替、监管批件、分类体系更新：**本台尚未整理**——项目 docs 没有版本号与更新日期可引，不补年份、不写批件号。

**来源**：本项目 · `research/myeloma-cancer/manifest.json`（快照日 2026-10-25，采集工具 unified_search_trials）· 一手采集数据 ｜ 其余条目本台尚未整理（无版本记录可引）

## 5 落地清单

- [ ] 将原型内嵌疾病介绍拆分为 `prototypes/v0.2/primer.css`（尚未拆分，待确认后视需要复用家族样式）
- [ ] 如需独立复用，再抽出 `prototypes/v0.2/primer.js` 与面板逻辑；当前由 app.js 内的 `primerView()` 打开
- [ ] 将四段内容与本文件结构化同步为独立 primer 数据常量；当前仅实现原型展示，尚未建立此数据接口
- [x] `index.html` 已加载单文件原型 app.js，由看板“打开病情介绍”入口调用 `primerView()`；未拆独立脚本/样式
- [x] 看板疾病概要卡有浮窗入口，顶栏也提供可点“?”按钮；专项无障碍及焦点行为仍按 P1–P8 状态核验
- [x] README 的 `## 疾病概要` 含四段可读正文；入口信息、来源链接状态及扩充细节已同步，内容由人工维护而非数据文件自动生成
- [ ] starter `scripts/probe-disease-primer.mjs --url http://127.0.0.1:4173/` 全绿，`--self-test` 至少 3 条 FAIL——已试跑 5/9；探针数据结构与本项目现有整页实现不兼容，需为本项目适配验收器后再判 P1–P8

## 6 验收（P1–P8）

本项目已有 M2 HTML 原型及 `primerView()` 四段整页展示，但尚未拆分 `primer-data.js`。2026-10-26 曾用 starter 的 `probe-disease-primer.mjs` 对本地页面试跑：5/9 通过、4 项失败；失败项是该探针要求 `.dp-*` 面板和 `window.DISEASE_PRIMER` 数据对象，而本项目保留既有 `#pageView` / `primerView()` 结构，因此 P2、P3、P5、P8 未被该探针有效覆盖。下表只记录本项目浏览器实际观察到的行为；此记录不代表完整 P1–P8 或 G2 验收通过。

| 编号 | 判据 | 结果 |
|---|---|---|
| P1 | 原模板判据：顶栏有可点「?」，aria-label 说明四段 | 浏览器 DOM 已观察到可点按钮及说明四段内容的 aria-label；焦点语义未专项验收 |
| P2 | 整页面板，四段齐全且顺序为 定义 → 指南 → 治疗全景 → 趋势 | 浏览器已观察到四段与顺序；正文可按章节按钮滚动，内容与来源准确性仍待评审 |
| P3 | 面板宽高 ≥ 视口 90% | 390×844、768×1024、1280×900 下浏览器测得面板分别为 390×844、748×1004、1260×880，均覆盖至少 90% 视口 |
| P4 | 打开压一条 history，`history.back()` 收起 | 从 `#page=primer` 打开后执行浏览器返回，面板关闭、hash 清空 |
| P5 | 「返回」「关闭」两个独立入口 | 两个独立按钮均在浮窗顶栏显示；「返回」退回看板，「关闭并回到看板」关闭浮窗 |
| P6 | 关闭后焦点回触发按钮、滚动位置不变 | 从看板滚动至 `scrollY=260` 后通过顶栏问号打开并关闭，焦点恢复 `#primerButton`，`scrollY` 恢复 260 |
| P7 | Esc 只退一层 | 浮窗打开时按 Esc 后面板关闭并回到无 hash 看板 |
| P8 | 四段齐全、每段有来源、趋势段无禁止词 | 浏览器观察到四段及逐段来源状态，趋势段未见 starter 禁止词；自动探针因不识别本项目数据结构而无法验此项，完整 P8 未通过验收 |

## 7 本项目教训

- **R-ISS 与「危险度细胞遗传学」差点被写成两套并列评分**。按 `docs/BRIEF.md` 的处理，本项目把「分期」与「细胞遗传学结果」分成两个字段；R-ISS 是「ISS + LDH + 细胞遗传学」的组合，不是另一套独立刻度。这一条如果不写清，患者会拿两个分数互相比较。
- **257 条必须连口径一起写**。单平台、6 个检索词、快照日 2026-10-25、阶段分布未统计——少写哪一条，这个数字就会被读成「全国在研总数」。项目 `manifest.json` 里的 `honesty` 段已经把这条写死：「登记 ≠ 有效 ≠ 安全 ≠ 可入组」。
- 全线版本号都拿不到，趋势段只保留一条有采集快照支撑的事实，其余写「本台尚未整理」，**不为了排满去编年份**。
