window.__ModuleLoader__.load({
  id: "@xyb-community/myeloma-workbench",
  factory(require) {
    const UI_ENTRY = '/api/myeloma-workbench/ui/'
    const React = require('react')
    const h = React.createElement
    const metadata = {"title":"多发性骨髓瘤患者工作台","description":"面向多发性骨髓瘤患者与照护者的本机病程资料、M 蛋白与游离轻链监测、治疗线循环、自体移植档案、骨事件与骨保护、感染与疫苗工作台设计项目"}
    const theme = "/* Scope to business content; never style host navigation globally. */\n.wb-myeloma-workbench {\n  --wb-paper: #f7faf8; --wb-surface: #ffffff; --wb-ink: #34413c;\n  --wb-muted: #596c62; --wb-line: #dce7df; --wb-mint: #e2f2ea;\n  --wb-mint-ink: #22664e; --wb-action: #b95023; --wb-action-ink: #ffffff;\n  --wb-pink: #f8e8eb; --wb-blue: #eaf1f6; --wb-yellow: #faf2d8;\n  --wb-radius: 18px; --wb-gap: 16px; --wb-group-gap: 24px;\n  color: var(--wb-ink); background: var(--wb-paper); font: 16px/1.65 -apple-system,BlinkMacSystemFont,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;\n  font-variant-numeric: tabular-nums; min-width: 0; min-height: 0; container-type: inline-size;\n}\n.wb-myeloma-workbench[data-font=large] { font-size: 19px; }\n.wb-myeloma-workbench * { box-sizing: border-box; }\n.wb-myeloma-workbench button,.wb-myeloma-workbench input,.wb-myeloma-workbench select { font: inherit; }\n.wb-myeloma-workbench button { min-height: 44px; cursor: pointer; }\n.wb-myeloma-workbench :focus-visible { outline: 3px solid var(--wb-mint-ink); outline-offset: 3px; }\n.wb-myeloma-workbench .wb-primary { background: var(--wb-action); color: var(--wb-action-ink); border: 0; border-radius: 999px; padding: 9px 20px; }\n.wb-myeloma-workbench .wb-flower { display: inline-block; width: 24px; height: 24px; flex: 0 0 auto; margin-inline-end: 10px; animation: wb-flower-turn 12s linear infinite; }\n@keyframes wb-flower-turn { to { transform: rotate(360deg); } }\n@media (prefers-color-scheme: dark) {\n  .wb-myeloma-workbench { --wb-paper:#17231f; --wb-surface:#20322a; --wb-ink:#edf5ef; --wb-muted:#c0d2c6; --wb-line:#496354; --wb-mint:#294f3f; --wb-mint-ink:#a0ddbd; --wb-action:#f3a578; --wb-action-ink:#39200e; --wb-pink:#45333a; --wb-blue:#283d4c; --wb-yellow:#473e25; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .wb-myeloma-workbench .wb-flower { animation:none; }\n}\n"
    const primerTheme = "/* 36 号 · 疾病概要（装机层内联样式，类名一律 wb-dp- 前缀，避免影响宿主导航） */\n.wb-dp-trigger{min-width:36px;min-height:36px;padding:0 10px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;color:var(--wb-mint-ink);background:var(--wb-mint);border:1px solid var(--wb-line);border-radius:999px;cursor:pointer}\n.wb-dp-trigger:focus-visible{outline:3px solid var(--wb-mint-ink);outline-offset:2px}\n.wb-dp-overlay{position:fixed;inset:0;z-index:70;display:flex;background:rgba(20,28,24,.38)}\n.wb-dp-panel{position:absolute;inset:clamp(8px,1.2vw,16px);display:flex;flex-direction:column;min-width:0;min-height:0;background:var(--wb-paper);border:1px solid var(--wb-line);border-radius:var(--wb-radius);box-shadow:0 18px 48px rgba(20,30,25,.24);overflow:hidden}\n.wb-dp-panel:focus{outline:none}\n.wb-dp-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;flex-shrink:0;min-height:56px;padding:0 12px;background:var(--wb-surface);border-bottom:1px solid var(--wb-line)}\n.wb-dp-head-title{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}\n.wb-dp-crumb{font-size:11px;color:var(--wb-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.wb-dp-title{margin:0;font-size:15px;font-weight:700;color:var(--wb-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.wb-dp-en{font-weight:500;font-size:11.5px;color:var(--wb-muted)}\n.wb-dp-btn{display:inline-flex;align-items:center;gap:4px;min-height:36px;padding:0 12px;font-size:12.5px;color:var(--wb-ink);background:var(--wb-surface);border:1px solid var(--wb-line);border-radius:9px;cursor:pointer;flex-shrink:0}\n.wb-dp-btn:focus-visible{outline:3px solid var(--wb-mint-ink);outline-offset:2px}\n.wb-dp-close{min-width:36px;justify-content:center;padding:0}\n.wb-dp-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:20px clamp(14px,1.6vw,28px) 56px}\n.wb-dp-inner{max-width:980px;margin:0 auto}\n.wb-dp-note{margin:0 0 18px;padding:11px 14px;font-size:12.5px;line-height:1.7;color:var(--wb-ink);background:var(--wb-mint);border-left:3px solid var(--wb-mint-ink);border-radius:0 9px 9px 0}\n.wb-dp-section{padding:16px 0 4px;border-top:1px dashed var(--wb-line)}\n.wb-dp-section:first-of-type{border-top:0}\n.wb-dp-section h3{margin:0 0 10px;font-size:15.5px;font-weight:700;color:var(--wb-ink);display:flex;align-items:baseline;gap:8px}\n.wb-dp-section h3::before{content:\"\";width:4px;height:15px;border-radius:2px;background:var(--wb-mint-ink);flex-shrink:0}\n.wb-dp-lead{margin:0 0 10px;font-size:13px;line-height:1.78;color:var(--wb-ink)}\n.wb-dp-group{margin:0 0 12px}\n.wb-dp-group h4{margin:0 0 5px;font-size:12.5px;font-weight:700;color:var(--wb-mint-ink)}\n.wb-dp-points{margin:0 0 10px;padding-left:0;list-style:none}\n.wb-dp-points li{position:relative;padding-left:18px;font-size:12.8px;line-height:1.75;color:var(--wb-ink);margin-bottom:5px}\n.wb-dp-points li::before{content:\"\";position:absolute;left:6px;top:.72em;width:5px;height:5px;border-radius:50%;background:var(--wb-muted)}\n.wb-dp-table-wrap{overflow-x:auto;margin:0 0 12px}\n.wb-dp-table{min-width:640px;border-collapse:collapse;width:100%;font-size:12.2px;background:var(--wb-surface);border:1px solid var(--wb-line);border-radius:9px}\n.wb-dp-table th,.wb-dp-table td{padding:7px 10px;text-align:left;border-bottom:1px solid var(--wb-line);vertical-align:top;line-height:1.6}\n.wb-dp-table th{background:var(--wb-mint);color:var(--wb-mint-ink);font-weight:700;white-space:nowrap}\n.wb-dp-table tr:last-child td{border-bottom:0}\n.wb-dp-src{margin:10px 0 0;font-size:11px;line-height:1.65;color:var(--wb-muted)}\n.wb-dp-src b{color:var(--wb-ink);margin-right:6px}\n.wb-dp-link{color:inherit;font-weight:600;text-decoration:underline;text-underline-offset:3px}\n.wb-dp-miss{color:#b3372e;font-weight:700}\n.wb-dp-foot{margin:22px 0 0;padding-top:14px;border-top:1px solid var(--wb-line);font-size:11.5px;line-height:1.7;color:var(--wb-muted)}\n.wb-status-card{margin:0;padding:18px 20px;background:linear-gradient(135deg,var(--wb-mint),var(--wb-surface) 70%);border:1px solid var(--wb-line);border-radius:var(--wb-radius)}\n.wb-status-head{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline}\n.wb-status-eyebrow{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--wb-mint-ink)}\n.wb-status-anchor{font-size:12px;color:var(--wb-muted)}\n.wb-status-main{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin:10px 0 14px}\n.wb-status-day{font-size:34px;line-height:1.1;color:var(--wb-mint-ink);font-variant-numeric:tabular-nums}\n.wb-status-current{display:flex;flex-direction:column;gap:2px;min-width:0}\n.wb-status-current b{font-size:15px}\n.wb-status-current span{font-size:13px;color:var(--wb-muted)}\n.wb-status-actions{display:flex;gap:10px;flex-wrap:wrap}\n.wb-status-guide{margin-top:12px;padding:12px 14px;background:var(--wb-surface);border:1px dashed var(--wb-line);border-radius:12px;font-size:13px}\n.wb-status-guide b{display:block;margin-bottom:6px}\n.wb-status-guide ol{margin:0 0 6px;padding-left:20px}\n.wb-status-guide p{margin:0;color:var(--wb-muted)}\n@media (max-width:760px){.wb-dp-panel{inset:0;border-radius:0;border:0}.wb-dp-body{padding:16px 14px 44px}.wb-status-day{font-size:29px}.wb-status-actions button{width:100%;text-align:left}}\n@media (prefers-reduced-motion: reduce){.wb-dp-overlay{animation:none}}\n"
    /* 36 号 · 疾病概要数据（内联：模块加载器不保证相对 require）。
       四段固定 definition → evidence → landscape → trend；内容与 README / docs/DISEASE-PRIMER.md 同源。
       链接为 2026-10-27 用 primer-backfill verify-links.mjs 实测 OK 的入口；缺链接在 UI 上红标。 */
    const PRIMER = {
  "brand": "小浆宝 MyeloPal",
  "name": "多发性骨髓瘤",
  "en": "Multiple Myeloma（MM）",
  "updated": "2026-10-27",
  "sections": [
    {
      "id": "definition",
      "title": "定义",
      "intro": "多发性骨髓瘤（multiple myeloma，MM）是以克隆性浆细胞增殖为特征的浆细胞肿瘤。浆细胞主要位于骨髓，异常克隆可产生单克隆免疫球蛋白或其片段（M 蛋白），疾病也可能出现溶骨性病灶。",
      "points": [
        "疾病分类需与意义未明的单克隆丙种球蛋白病（MGUS）、冒烟型骨髓瘤（SMM）及浆细胞瘤等区分；诊断依据完整检查和临床团队记录，本台不自行判断。",
        "CRAB 框架涵盖高钙血症（C）、肾功能损害（R）、贫血（A）和骨病变（B）；SLiM 还涉及骨髓克隆性浆细胞比例、游离轻链比值和 MRI 病灶等定义事件。",
        "按分泌类型可见 IgG、IgA 等重链型及轻链型。轻链型记录可能需单独查看血清游离轻链（FLC），不能只凭单一检测推断病情。",
        "ISS / R-ISS 是分期框架；细胞遗传学结果与分期相关，但不是可互换字段。del(17p)、t(4;14) 等结果不由本台自动换算为个人风险结论。",
        "美国 SEER 2019–2023 数据报告诊断中位年龄为 69 岁，仅是美国人群统计，不代表其他地区分布或个人情况。"
      ],
      "sources": [
        {
          "org": "IMWG",
          "doc": "Criteria for the Diagnosis of Multiple Myeloma（IMF 公开摘要）",
          "version": "原始标准发表于 2014 年",
          "original": false,
          "secondaryUrl": "https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma",
          "note": "2014 原始论文 DOI 实测仅返回二进制（THIN），未取得可核对全文"
        },
        {
          "org": "WHO / IARC",
          "doc": "WHO Classification of Tumours Online: Haematolymphoid Tumours",
          "version": "第 5 版 Volume 11；2024",
          "original": false,
          "secondaryUrl": "https://whobluebooks.iarc.who.int/structures/haematolymphoid/",
          "note": "在线分类层级可查看；完整出版内容未取得"
        },
        {
          "org": "NCI / SEER",
          "doc": "SEER Cancer Stat Facts: Myeloma",
          "version": "统计期 2019–2023",
          "original": true,
          "kind": "dataset",
          "url": "https://seer.cancer.gov/statfacts/html/mulmy.html",
          "note": "美国人群统计，不外推到个人或其他地区"
        }
      ]
    },
    {
      "id": "evidence",
      "title": "医学资料规范和指南情况",
      "intro": "这个工作台里出现的每一条「该查什么、该怎么分期」，都应能追到下面某一份文件。未取得完整原件的，在表里如实标出，不假装看过。",
      "table": {
        "head": [
          "机构",
          "文件",
          "版本 / 年份",
          "原件",
          "本台的用途"
        ],
        "rows": [
          [
            "NCCN",
            "Guidelines for Patients: Multiple Myeloma",
            "官方 PDF 地址；具体版次未核实",
            {
              "text": "未取得可核对原件，据 NCCN 患者指南入口",
              "kind": "hub",
              "url": "https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients",
              "note": "患者版 PDF 直链实测仅返回二进制（THIN），未取得可核对正文"
            },
            "患者版疾病与治疗信息入口；本台不引未核实条文"
          ],
          [
            "NCCN",
            "NCCN Clinical Practice Guidelines in Oncology: Multiple Myeloma",
            "官方目录索引可见 Version 2.2027；正文未核",
            {
              "text": "官方入口 · 需自行注册（本台未取得该版正文）",
              "kind": "hub",
              "url": "https://www.nccn.org/guidelines/category_1",
              "note": "临床版全文需在 NCCN 官网注册后取得"
            },
            "专业指南入口；引用前需确认正文版本与更新日期"
          ],
          [
            "IMWG",
            "Criteria for the Diagnosis of Multiple Myeloma",
            "IMF 摘要对应的原始标准发表于 2014 年",
            {
              "text": "未取得原件，据 IMF 公开摘要",
              "kind": "hub",
              "url": "https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma",
              "note": "IMF 公开摘要，非 2014 原始论文全文"
            },
            "CRAB、SLiM 与浆细胞疾病诊断框架入口"
          ],
          [
            "IMWG",
            "Consensus recommendations for risk stratification in multiple myeloma",
            "原始论文 2014；在线摘要页未标版本",
            {
              "text": "未取得原件，据 IMF 公开摘要",
              "kind": "hub",
              "url": "https://www.myeloma.org/imwg/imwg-consensus-risk-stratification-multiple-myeloma",
              "note": "IMF 公开摘要，非原始论文全文"
            },
            "仅说明风险分层资料来源，不推导个人风险"
          ],
          [
            "CSCO",
            "2025 指南汇编信息与骨髓瘤更新解读回放",
            "汇编信息页发布于 2026-05-06；会议回放标注 2025",
            {
              "text": "未取得原件，据 CSCO 指南汇编信息页",
              "kind": "hub",
              "url": "https://www.csco.org.cn/cn/ncontent.aspx?oid=9038",
              "note": "指南汇编获取页，非指南全文"
            },
            "仅作获取入口和解读资料，不引指南条文"
          ],
          [
            "WHO / IARC",
            "WHO Classification of Tumours Online: Haematolymphoid Tumours",
            "第 5 版 Volume 11；2024",
            {
              "text": "未取得完整出版内容，据在线分类入口",
              "kind": "hub",
              "url": "https://whobluebooks.iarc.who.int/structures/haematolymphoid/",
              "note": "在线分类入口，完整出版内容需订阅或图书"
            },
            "疾病分类入口，不是治疗指南"
          ],
          [
            "NCI",
            "Myeloma Treatment (PDQ), Health Professional Version",
            "最近更新 2025-04-25",
            {
              "text": "已取得：公开二次资料全文页",
              "kind": "fulltext",
              "url": "https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq",
              "note": "公开全文页"
            },
            "补充美国语境疾病背景与治疗类别，不替代本地指南"
          ],
          [
            "SEER",
            "Cancer Stat Facts: Myeloma",
            "统计期 2019–2023",
            {
              "text": "已取得：公开人群统计数据集页",
              "kind": "dataset",
              "url": "https://seer.cancer.gov/statfacts/html/mulmy.html",
              "note": "公开人群统计"
            },
            "人群背景示例，不外推到个人或其他地区"
          ]
        ]
      },
      "points": [
        "指南给的是「通常怎么做」，不是「你该怎么做」。版本号必须写清：同一份指南隔一年，条目会变。",
        "未取得完整原件的资料只登记入口、版本状态和用途，不引用未核对的条文、推荐等级或剂量。",
        "表中「原件」列可点击的链接只代表来源入口已核对；链接可访问不等于取得或审阅全文。"
      ],
      "sources": [
        {
          "org": "NCCN",
          "doc": "NCCN Guidelines · Multiple Myeloma",
          "version": "Version 2.2027（仅目录索引）",
          "entry": true,
          "kind": "hub",
          "url": "https://www.nccn.org/guidelines/category_1",
          "note": "NCCN 指南目录中的 Multiple Myeloma 条目；临床版全文需在 NCCN 官网注册后取得，本台未取得该版原件"
        },
        {
          "org": "IMWG",
          "doc": "Criteria for the Diagnosis of Multiple Myeloma",
          "version": "2014",
          "original": false,
          "secondaryUrl": "https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma",
          "note": "未取得原件，据 IMF 公开摘要"
        },
        {
          "org": "WHO / IARC",
          "doc": "Haematolymphoid Tumours（第 5 版 Volume 11）",
          "version": "2024",
          "original": false,
          "secondaryUrl": "https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024",
          "note": "官方出版信息；完整内容需通过图书或订阅访问"
        },
        {
          "org": "NCI",
          "doc": "Myeloma Treatment (PDQ), Health Professional Version",
          "version": "2025-04-25",
          "original": true,
          "kind": "fulltext",
          "url": "https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq",
          "note": "美国语境二次资料"
        },
        {
          "org": "NCI / SEER",
          "doc": "SEER Cancer Stat Facts: Myeloma",
          "version": "2019–2023",
          "original": true,
          "kind": "dataset",
          "url": "https://seer.cancer.gov/statfacts/html/mulmy.html",
          "note": "美国人群统计"
        }
      ]
    },
    {
      "id": "landscape",
      "title": "目前治疗全景概要",
      "intro": "下面按病程阶段列出指南与资料里出现的治疗类别，用来识别术语；不比较方案，不给治疗顺序或个人适用性判断。",
      "groups": [
        {
          "label": "初治阶段 · 诱导治疗",
          "points": [
            "可能涉及蛋白酶体抑制剂、免疫调节剂、抗 CD38 单抗及糖皮质激素等药物类别；组合依指南版本和临床背景而异。",
            "传统化疗类别在部分情形下被列出；是否采用、采用哪一种，属于医生判断。"
          ]
        },
        {
          "label": "部分患者的治疗环节 · 自体造血干细胞移植",
          "points": [
            "涉及干细胞动员、采集、预处理、回输及恢复随访等环节。",
            "本工作台只记录日期和原始资料，不评估是否适合移植。"
          ]
        },
        {
          "label": "治疗后阶段 · 巩固与维持",
          "points": [
            "可包含巩固治疗及维持治疗类别；方案与持续时间以医生记录和当前指南原文为准。"
          ]
        },
        {
          "label": "复发或难治阶段 · 后线治疗与研究",
          "points": [
            "可能涉及换用未使用过的药物类别、参加临床研究、细胞治疗与双特异性抗体类等类别。",
            "国内获批状态与可及性需另行核实。"
          ]
        },
        {
          "label": "全程支持与复查",
          "points": [
            "骨保护（双膦酸盐 / 地舒单抗类别）、感染预防与疫苗、肾功能相关处理、贫血与血钙的处理类别。",
            "复查包括 M 蛋白、游离轻链、血常规、血钙 / 肌酐及影像等，依临床安排；本台只记录数值、日期、单位、来源与方法。"
          ]
        }
      ],
      "points": [
        "以上是文献与指南里列出的手段，按病期与线序排列，不代表任何一项适合你。选哪一个，这一句需要问你的医生。"
      ],
      "sources": [
        {
          "org": "NCCN",
          "doc": "NCCN Guidelines · Multiple Myeloma",
          "version": "Version 2.2027（仅目录索引）",
          "entry": true,
          "kind": "hub",
          "url": "https://www.nccn.org/guidelines/category_1",
          "note": "NCCN 指南目录中的 Multiple Myeloma 条目；临床版全文需在 NCCN 官网注册后取得，本台未取得该版原件"
        },
        {
          "org": "NCI",
          "doc": "Myeloma Treatment (PDQ), Health Professional Version",
          "version": "2025-04-25",
          "original": true,
          "kind": "fulltext",
          "url": "https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq",
          "note": "美国语境二次资料"
        },
        {
          "org": "CSCO",
          "doc": "2025 指南汇编信息",
          "version": "页面发布于 2026-05-06",
          "original": false,
          "secondaryUrl": "https://www.csco.org.cn/cn/ncontent.aspx?oid=9038",
          "note": "未取得指南全文，仅作获取入口"
        }
      ]
    },
    {
      "id": "trend",
      "title": "发展趋势",
      "intro": "这一段只写已经发生的事：有日期、来源和明确统计口径。不写预测，不做评价，也不给任何倾向。",
      "points": [
        "截至 2026-10-25：本项目用 6 个中英文检索词（多发性骨髓瘤 / 骨髓瘤 / 浆细胞瘤 / multiple myeloma / myeloma / plasma cell myeloma）在 unified_search_trials 采集到登记记录 257 条。",
        "口径：单平台、指定检索式、快照日 2026-10-25，不是全量统计；I / II / III 期分布未统计，登记状态一律「未核实」。",
        "指南版本更替、监管批件、分类体系更新：本台尚未整理——项目 docs 没有版本号与更新日期可引，不补年份、不写批件号。"
      ],
      "sources": [
        {
          "org": "本项目",
          "doc": "research/myeloma-cancer/manifest.json（快照日 2026-10-25，采集工具 unified_search_trials）",
          "version": "2026-10-25",
          "nolink": true,
          "note": "本机一手采集快照，无公开 URL；随仓库研究目录保存"
        }
      ]
    }
  ]
}

    const safeHref = (value) => {
      if (!value || typeof value !== 'string') return ''
      const text = value.trim()
      return /^https:\/\//i.test(text) ? text : ''
    }

    function sourceLine(source) {
      const head = [source.org, source.doc].filter(Boolean).join(' · ')
      const tail = []
      if (source.version) tail.push(source.version)
      if (source.nolink) {
        tail.push(source.note || '（未取得原件）')
      } else if (source.entry) {
        const url = safeHref(source.url)
        tail.push(url
          ? h('a', { className: 'wb-dp-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, '官方入口 ↗ 需自行注册')
          : h('span', { className: 'wb-dp-miss' }, '（缺链接，违反 36 号 §2.5）'))
      } else if (source.original) {
        const url = safeHref(source.url)
        tail.push(url
          ? h('a', { className: 'wb-dp-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, '原件已取得 · 打开/下载 ↗')
          : h('span', { className: 'wb-dp-miss' }, '（缺链接，违反 36 号 §2.5）'))
      } else {
        const url = safeHref(source.secondaryUrl)
        tail.push(url
          ? h('a', { className: 'wb-dp-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, '未取得原件，据二次来源 ↗')
          : h('span', { className: 'wb-dp-miss' }, '（缺二次链接，违反 36 号 §2.5）'))
      }
      if (source.page) tail.push('页码 ' + source.page)
      if (source.note && !source.nolink) tail.push(source.note)
      return h('span', { key: head + (source.version || '') }, head, tail.length ? '（' : '', ...tail.flatMap((item, index) => index ? [' · ', item] : [item]), tail.length ? '）' : '')
    }

    function tableCell(cell, index) {
      if (cell && typeof cell === 'object' && !Array.isArray(cell)) {
        const url = safeHref(cell.url)
        if (url) return h('a', { key: index, className: 'wb-dp-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, String(cell.text == null ? '' : cell.text), ' ↗')
        return h('span', { key: index }, String(cell.text == null ? '' : cell.text), h('span', { className: 'wb-dp-miss' }, '（缺 https 链接，违反 36 号 §2.5）'))
      }
      return String(cell == null ? '' : cell)
    }

    function primerSection(section, index) {
      const body = []
      if (section.intro) body.push(h('p', { key: 'intro', className: 'wb-dp-lead' }, section.intro))
      if (Array.isArray(section.groups)) body.push(...section.groups.map((group, groupIndex) => h('div', { key: 'group' + groupIndex, className: 'wb-dp-group' },
        h('h4', null, group.label),
        h('ul', { className: 'wb-dp-points' }, (group.points || []).map((point, pointIndex) => h('li', { key: pointIndex }, point))))))
      if (Array.isArray(section.points)) body.push(h('ul', { key: 'points', className: 'wb-dp-points' }, section.points.map((point, pointIndex) => h('li', { key: pointIndex }, point))))
      if (section.table) body.push(h('div', { key: 'table', className: 'wb-dp-table-wrap' }, h('table', { className: 'wb-dp-table' },
        h('thead', null, h('tr', null, section.table.head.map((head, headIndex) => h('th', { key: headIndex }, head)))),
        h('tbody', null, section.table.rows.map((row, rowIndex) => h('tr', { key: rowIndex }, row.map((cell, cellIndex) => h('td', { key: cellIndex }, tableCell(cell, cellIndex)))))))))
      if (!body.length) body.push(h('p', { key: 'empty', className: 'wb-dp-lead' }, '本台尚未整理这一段。'))
      const sources = Array.isArray(section.sources) && section.sources.length
        ? h('p', { className: 'wb-dp-src' }, h('b', null, '来源'), ...section.sources.flatMap((source, sourceIndex) => sourceIndex ? [' ｜ ', sourceLine(source)] : [sourceLine(source)]))
        : h('p', { className: 'wb-dp-src wb-dp-miss' }, h('b', null, '来源'), '未标注 —— 这一段还不能用。')
      return h('section', { key: section.id, className: 'wb-dp-section', 'data-dp-section': section.id, 'aria-labelledby': 'wb-dp-h-' + index },
        h('h3', { id: 'wb-dp-h-' + index }, section.title || ''), ...body, sources)
    }

    function PrimerOverlay({ open, onClose, panelRef }) {
      if (!open) return null
      return h('div', { className: 'wb-dp-overlay', id: 'wb-disease-primer', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'wb-dp-title' },
        h('div', { className: 'wb-dp-panel', tabIndex: -1, ref: panelRef },
          h('div', { className: 'wb-dp-head' },
            h('button', { className: 'wb-dp-btn', type: 'button', onClick: onClose, 'aria-label': '返回工作台' }, '← 返回'),
            h('div', { className: 'wb-dp-head-title' },
              h('span', { className: 'wb-dp-crumb' }, PRIMER.brand + ' › 疾病概要'),
              h('h2', { className: 'wb-dp-title', id: 'wb-dp-title' }, PRIMER.name, PRIMER.en ? h('span', { className: 'wb-dp-en' }, ' ' + PRIMER.en) : null)),
            h('button', { className: 'wb-dp-btn wb-dp-close', type: 'button', onClick: onClose, 'aria-label': '关闭疾病概要' }, '✕')),
          h('div', { className: 'wb-dp-body' },
            h('div', { className: 'wb-dp-inner' },
              h('p', { className: 'wb-dp-note' }, '这是公开信息的整理，属于解释：说明这个病是什么、依据哪些文件、指南里列了哪些手段、这些年发生了什么变化。它不是对你个人情况的判断，也不构成任何建议。'),
              ...PRIMER.sections.map((section, index) => primerSection(section, index)),
              h('p', { className: 'wb-dp-foot' }, '最后更新 ' + (PRIMER.updated || '未标注') + ' · 内容只做事实与原文整理 · 任何与你有关的判断，这一句需要问你的医生。')))))
    }

    /* ---------------- AI 会话面板（customFrame 分栏，家族基线） ----------------
     * 宿主把 DSH 原生会话节点作为 conversation prop 交给我们排版：
     * - 右侧 aside 常挂载，显隐只用 display（卸载会丢输入框与草稿）；
     * - 宽度 25%–45%、默认 35%、步进 2%，localStorage 持久化，键盘 ←/→/Home/End；
     * - 容器窄于 760px 改覆盖式抽屉，业务区不让位；
     * - 点击「AI 对话」复用本工作台归属会话，没有才 ensureSession 建一次；
     *   开场白只填进原生草稿，不自动发送（AI 不代发、不代下结论）。
     */
    const AGENT_MIN = 0.25, AGENT_MAX = 0.45, AGENT_DEFAULT = 0.35, AGENT_STEP = 0.02
    const NARROW_BELOW = 760, DRAWER_MAX = 420
    const WIDTH_KEY = 'xyb.myeloma.agent-pane.v1'
    const DRAFT_QUEUE_KEY = 'xyb.myeloma.initial-draft.v1'
    const DRAFT_LIMIT = 8000

    const clampRatio = (value) => {
      const n = Number(value)
      if (!Number.isFinite(n)) return AGENT_DEFAULT
      return Math.min(AGENT_MAX, Math.max(AGENT_MIN, n))
    }
    /* 对齐到步进：键盘与鼠标落在同一组取值上，不拖出 33.7% 这种数 */
    const snapRatio = (value) => clampRatio(Math.round(value / AGENT_STEP) * AGENT_STEP)
    const round4 = (n) => Math.round(n * 10000) / 10000
    const loadWidth = () => {
      try { return clampRatio(localStorage.getItem(WIDTH_KEY)) } catch { return AGENT_DEFAULT }
    }
    const saveWidth = (value) => {
      try { localStorage.setItem(WIDTH_KEY, String(round4(value))) } catch { /* 隐私模式写不进去，不挡使用 */ }
    }

    /* 分隔线品牌色（本仓品牌紫）；悬停/拖动光晕由它派生，不写死蓝色 */
    const SPLITTER_BRAND = '#6b4e7a'
    const splitterRgba = (hex, alpha) => {
      const raw = String(hex).replace('#', '')
      const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw
      const n = parseInt(full, 16)
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
    }

    let bridge = null

    /* 会话归属（与家族同一套已验证接口，不猜 API） */
    function currentSession() {
      const service = bridge && bridge.desktopWorkbenches
      if (service && typeof service.currentSession === 'function') return service.currentSession() || null
      const snapshot = bridge && bridge.sessions && bridge.sessions.list && bridge.sessions.list.getSnapshot
        ? bridge.sessions.list.getSnapshot()
        : null
      return (snapshot && (snapshot.current || Object.keys(snapshot.byId || {}).find((id) =>
        ((snapshot.byId[id] && snapshot.byId[id].retainedBy && snapshot.byId[id].retainedBy.mainView) || 0) > 0))) || null
    }
    function workbenchOwnsSession(id) {
      const service = bridge && bridge.desktopWorkbenches
      return Boolean(id && service && typeof service.ownsSession === 'function' && service.ownsSession(id))
    }
    function ownedSession() {
      const id = currentSession()
      return workbenchOwnsSession(id) ? id : null
    }

    /* 只填草稿：不覆盖已有内容、不合并引用态、不自动发送 */
    function fillDraft(sessionId, prompt) {
      if (!sessionId || ownedSession() !== sessionId) throw new Error('会话已切换，请回到本工作台再操作')
      const actx = bridge.sessions.scope(sessionId)
      const conversation = actx && actx.get ? actx.get('conversation') : null
      if (!conversation) throw new Error('对话输入不可用')
      const input = conversation.input.for(actx)
      const snapshot = input.state.getSnapshot()
      if ((snapshot.occurrences && snapshot.occurrences.length) || (snapshot.phase && snapshot.phase !== 'plain')) {
        throw new Error('当前草稿含引用或特殊输入，请先在原生会话里处理')
      }
      const current = snapshot.draft || ''
      input.setDraft(current.trim() ? `${current}\n\n${prompt}` : prompt)
    }

    let pendingDraft = null
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_QUEUE_KEY) || 'null')
      if (saved && saved.sessionId && saved.prompt) pendingDraft = saved
    } catch { /* 隐私模式忽略 */ }
    function rememberDraft(entry) {
      pendingDraft = entry
      try {
        if (entry) localStorage.setItem(DRAFT_QUEUE_KEY, JSON.stringify(entry))
        else localStorage.removeItem(DRAFT_QUEUE_KEY)
      } catch { /* 隐私模式忽略 */ }
    }
    function flushDraft() {
      if (!pendingDraft) return false
      try {
        fillDraft(pendingDraft.sessionId, pendingDraft.prompt)
        rememberDraft(null)
        return true
      } catch { return false /* composer 未就绪：留给下一轮 */ }
    }

    function onboardingPrompt(dir) {
      return [
        '你正在协助我使用「小浆宝 MyeloPal 多发性骨髓瘤工作台」。它只做本机资料整理，不提供诊疗建议。',
        `资料目录：${dir || '（首次打开时在面板里选择）'}`,
        '里面是我的 M 蛋白与游离轻链、治疗线循环、自体移植档案、骨事件与骨保护、感染与疫苗记录、复查安排和我想问的问题。',
        '分工：你帮我汇总、找缺漏、把报告里的数值和日期整理成对照表（数值照抄、单位随报告原文）；判断和决定由我和治疗团队做。',
      ].join('\n')
    }

    function Panel({ conversation }) {
      const [health, setHealth] = React.useState(null)
      const [error, setError] = React.useState('')
      const [large, setLarge] = React.useState(false)
      /* 资料目录口径（服务端 checkDataDir 会再判一遍）：主目录本身/桌面/下载根目录/tmp 不当资料目录 */
      const DATA_ROOT_URL = '/api/myeloma-workbench/api/root'
      const HOME_EXACT = /^(\/Users\/[^/]+|\/home\/[^/]+|\/root|[A-Za-z]:\\Users\\[^\\]+)$/i
      const FORBIDDEN_DIR = /((Desktop|桌面)$|(Downloads?|下载(夹)?)$|^(\/tmp|\/private\/tmp|\/var\/folders\/|\/private\/var\/folders\/))/i
      const isForbiddenDir = (dir) => HOME_EXACT.test(dir) || FORBIDDEN_DIR.test(dir)
      const [dataDir, setDataDir] = React.useState('')
      const [dirNote, setDirNote] = React.useState('')
      const [attempt, setAttempt] = React.useState(0)
      const [primerOpen, setPrimerOpen] = React.useState(false)
      const [guideOpen, setGuideOpen] = React.useState(false)
      const [uiBroken, setUiBroken] = React.useState(false)
      const triggerRef = React.useRef(null)
      const panelRef = React.useRef(null)
      /* ---- AI 会话面板状态 ---- */
      const [note, setNote] = React.useState('')
      const [width, setWidth] = React.useState(loadWidth)
      const [paneOpen, setPaneOpen] = React.useState(true)
      const [connecting, setConnecting] = React.useState(false)
      const [narrow, setNarrow] = React.useState(false)
      const [dragging, setDragging] = React.useState(false)
      const [hovering, setHovering] = React.useState(false)
      const shellRef = React.useRef(null)
      const dragHostRef = React.useRef(null)
      const frameRef = React.useRef(null)
      const [paneTick, setPaneTick] = React.useState(0)
      /* 会话归属只问宿主：customFrame 下没会话也会传隐藏 conversation 容器，不能用它判断 */
      const activeSession = ownedSession() // eslint-disable-line react-hooks/exhaustive-deps -- paneTick 触发重渲染
      void paneTick
      const hasConversation = Boolean(activeSession) // pane-contract-allow: 见上
      const canOpenSession = Boolean(bridge && bridge.desktopWorkbenches && typeof bridge.desktopWorkbenches.newSession === 'function')
      // 会话新建/切换/归属变化 → bump tick 触发重渲染
      React.useEffect(() => {
        const unsubscribe = bridge?.desktopWorkbenches?.subscribe?.(() => setPaneTick((n) => n + 1))
        return () => { try { unsubscribe?.() } catch { /* 卸载竞态忽略 */ } }
      }, [])
      React.useEffect(() => {
        const controller = new AbortController()
        setHealth(null); setError('')
        fetch('/api/myeloma-workbench/health', { signal: controller.signal, credentials: 'same-origin' })
          .then(async (response) => {
            if (!response.ok) throw new Error(`服务连接失败 (${response.status})`)
            const result = await response.json()
            if (!controller.signal.aborted) setHealth(result)
          })
          .catch((failure) => { if (!controller.signal.aborted) setError(failure.message) })
        return () => controller.abort()
      }, [attempt])
      /* 业务界面在 public/（原型提升而来）。探不到就退回骨架，避免白屏。 */
      React.useEffect(() => {
        const controller = new AbortController()
        fetch(UI_ENTRY, { method: 'HEAD', signal: controller.signal, credentials: 'same-origin' })
          .then((response) => { if (!response.ok) setUiBroken(true) })
          .catch(() => setUiBroken(true))
        return () => controller.abort()
      }, [attempt])

      React.useEffect(() => {
        if (primerOpen) {
          if (panelRef.current) panelRef.current.focus()
          const onKey = (event) => { if (event.key === 'Escape') { event.preventDefault(); setPrimerOpen(false) } }
          document.addEventListener('keydown', onKey)
          const previousOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
          return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow }
        }
        if (triggerRef.current) { const trigger = triggerRef.current; triggerRef.current = null; try { trigger.focus({ preventScroll: true }) } catch (_) { try { trigger.focus() } catch (__) {} } }
        return undefined
      }, [primerOpen])
      /* ---------------- AI 会话：调起/复用、草稿队列、分栏 ---------------- */
      React.useEffect(() => {
        const timer = setInterval(() => { if (flushDraft()) setNote('草稿已填入会话，按回车发送') }, 500)
        const service = bridge && bridge.desktopWorkbenches
        const unsubscribe = service && service.subscribe ? service.subscribe(() => setNote('')) : null
        return () => { clearInterval(timer); if (unsubscribe) unsubscribe() }
      }, [])

      React.useEffect(() => {
        if (!canOpenSession) setNote('当前 Desktop 版本不支持从面板调起会话；请从左侧会话列表新建会话')
      }, [canOpenSession])

      /* 窄屏判定用**容器宽度**，不是窗口宽度：宿主主区宽度 ≠ 窗口宽度 */
      React.useEffect(() => {
        const host = shellRef.current
        if (!host || typeof ResizeObserver !== 'function') return undefined
        const observer = new ResizeObserver((entries) => {
          const w = (entries[0] && entries[0].contentRect && entries[0].contentRect.width) || 0
          setNarrow(w > 0 && w < NARROW_BELOW)
        })
        observer.observe(host)
        return () => observer.disconnect()
      }, [])

      const applyWidth = React.useCallback((next) => {
        const snapped = round4(snapRatio(next))
        setWidth(snapped)
        saveWidth(snapped)
      }, [])
      const stopDrag = React.useCallback(() => {
        dragHostRef.current = null
        setDragging(false)
      }, [])
      React.useEffect(() => {
        if (!dragging) return undefined
        const onMove = (event) => {
          const host = dragHostRef.current
          if (!host) return
          const rect = host.getBoundingClientRect()
          if (!rect.width) return
          /* 会话在右侧：指针越靠左，会话越宽 */
          applyWidth((rect.right - event.clientX) / rect.width)
        }
        document.addEventListener('pointermove', onMove)
        document.addEventListener('pointerup', stopDrag)
        document.addEventListener('pointercancel', stopDrag)
        return () => {
          document.removeEventListener('pointermove', onMove)
          document.removeEventListener('pointerup', stopDrag)
          document.removeEventListener('pointercancel', stopDrag)
        }
      }, [dragging, applyWidth, stopDrag])

      const onSplitterPointerDown = (event) => {
        event.preventDefault()
        try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* 旧宿主无指针捕获：document 监听兜住 */ }
        dragHostRef.current = shellRef.current
        setDragging(true)
      }
      const onSplitterKeyDown = (event) => {
        const delta = { ArrowLeft: AGENT_STEP, ArrowRight: -AGENT_STEP }[event.key]
        if (delta !== undefined) { event.preventDefault(); applyWidth(width + delta); return }
        if (event.key === 'Home') { event.preventDefault(); applyWidth(AGENT_MAX); return }
        if (event.key === 'End') { event.preventDefault(); applyWidth(AGENT_MIN) }
      }

      async function openAgent(prompt) {
        setNote('')
        if (!canOpenSession) {
          setNote('当前 Desktop 版本不支持从面板调起会话；请从左侧会话列表新建会话')
          return
        }
        // 已有归属会话：只展开，不重复创建
        if (ownedSession()) { setPaneOpen(true); return }
        setConnecting(true)
        try {
          let dir = null
          try {
            const res = await fetch('/api/myeloma-workbench/health')
            dir = (await res.json()).dir || null
          } catch { /* 拿不到目录也照样调起 */ }
          /* 优先默认工作区；无可用工作区时传 undefined，让宿主提示选目录 */
          let workspaceId
          try { workspaceId = bridge.desktopWorkbenches.defaultWorkspace?.()?.workspaceId } catch { workspaceId = undefined }
          const id = await bridge.desktopWorkbenches.newSession(workspaceId)
          if (!id) {
            setNote('已取消资料目录选择，没有创建会话。可以再次点击「AI 对话」重试。')
            return
          }
          rememberDraft({ sessionId: id, prompt: (prompt || onboardingPrompt(dir)).slice(0, DRAFT_LIMIT) })
          flushDraft()
          setPaneOpen(true)
          setNote('会话已就绪：开场白只填进草稿，按回车才会发送')
        } catch (error) {
          setNote(`没能创建会话：${(error && error.message) || error}。可以再次点击「AI 对话」重试。`)
        } finally {
          setConnecting(false)
        }
      }
      /* 收起只是隐藏，不结束会话；再点「打开 AI 对话」回到同一会话 */
      function onAgentClick() {
        if (!hasConversation) { void openAgent(null); return }
        setPaneOpen((open) => !open)
        setNote('')
      }

      const openPrimer = (event) => { triggerRef.current = event.currentTarget; setPrimerOpen(true) }
      /* 当前资料目录：开面板读一次；换过之后立即回显 */
      React.useEffect(() => {
        let alive = true
        fetch(DATA_ROOT_URL, { credentials: 'same-origin' })
          .then((r) => (r.ok ? r.json() : null))
          .then((info) => { if (alive && info && info.dir) setDataDir(info.dir) })
          .catch(() => { /* 读不到就不显示，别编一个路径 */ })
        return () => { alive = false }
      }, [attempt])

      /* 「配置目录」= 真入口：宿主选择器 → 口径校验 → 落盘 → 回显。
         「本原型为示意，目录未真实挂载」只允许出现在宿主没有选择能力的降级路径。 */
      async function pickDataDir() {
        const ui = bridge && bridge.uiWorkspace
        if (!ui || typeof ui.pickDirectory !== 'function') {
          setDirNote('本原型为示意，目录未真实挂载：当前 Desktop 没有提供目录选择能力，数据仍写在默认位置。')
          return
        }
        let dir = ''
        try { dir = await ui.pickDirectory() } catch (error) {
          setDirNote('没能打开目录选择器：' + ((error && error.message) || error))
          return
        }
        if (!dir) { setDirNote('已取消选择目录；当前资料目录没有更改。'); return }
        if (isForbiddenDir(dir)) {
          setDirNote('这个位置不能当资料目录（主目录本身 / 桌面 / 下载根目录 / tmp）。请在里面新建一个专用文件夹再选。')
          return
        }
        try {
          const rsp = await fetch(DATA_ROOT_URL, {
            method: 'POST', credentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ dir }),
          })
          const body = await rsp.json().catch(() => ({}))
          if (!rsp.ok) { setDirNote(body.error || '目录切换失败'); return }
          setDataDir(body.dir || dir)
          setDirNote('资料目录已切换到：' + (body.dir || dir) + '（旧目录数据不会自动搬迁）')
        } catch (error) {
          setDirNote('目录切换失败：' + ((error && error.message) || error))
        }
      }

      const agentLabel = !canOpenSession
        ? 'AI 对话暂不可用'
        : connecting ? '正在连接…'
          : !hasConversation ? 'AI 对话'
            : paneOpen ? '收起 AI 对话' : '打开 AI 对话'
      const percent = Math.round(width * 100)
      const paneVisible = paneOpen && (hasConversation || connecting)

      /* ---- 外壳样式（顶栏 / 业务区 / 会话区 / 分隔线） ---- */
      const rootStyle = { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, minWidth: 0, width: '100%', background: '#f7f5f2', color: '#29272b', font: '13px/1.55 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif' }
      const headerStyle = {
        display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto', flexWrap: 'wrap',
        padding: '6px 12px', paddingInlineStart: 'calc(12px + var(--dsh-frame-leading-clearance, 0px))',
        borderBottom: '1px solid #e6e0e7', background: '#fff',
      }
      const brandStyle = { fontSize: 12.5, fontWeight: 700, color: '#6b4e7a', whiteSpace: 'nowrap' }
      const verStyle = { fontSize: 11, color: '#69656c', background: '#eee8f1', borderRadius: 999, padding: '1px 8px', whiteSpace: 'nowrap' }
      const hintStyle = { flex: 1, minWidth: 180, fontSize: 11.5, color: '#69656c' }
      const headerActionsStyle = { display: 'flex', alignItems: 'center', gap: 6, flex: '0 0 auto', marginLeft: 'auto', flexWrap: 'wrap' }
      const buttonStyle = { border: 0, borderRadius: 999, padding: '5px 14px', minHeight: 32, minWidth: 44, whiteSpace: 'nowrap', background: '#6b4e7a', color: '#fff', font: 'inherit', fontWeight: 600, cursor: 'pointer' }
      const ghostStyle = { ...buttonStyle, background: 'transparent', color: '#6b4e7a', border: '1px solid #e6e0e7' }
      const smallStyle = { ...ghostStyle, minWidth: 36, padding: '4px 10px' }
      const noteStyle = { color: '#6b4e7a', fontWeight: 600, fontSize: 11.5, maxWidth: 340 }
      const bodyStyle = { position: 'relative', display: 'flex', flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }
      const businessStyle = { flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }
      const frameStyle = { flex: '1 1 auto', width: '100%', minHeight: 0, border: 0, display: 'block', background: '#f7faf8' }
      const paneStyle = {
        display: 'flex', flexDirection: 'column', flex: '0 0 auto', minWidth: 0, minHeight: 0,
        borderLeft: '1px solid #e6e0e7', background: '#fff', overflow: 'hidden',
      }
      const drawerStyle = {
        position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 3,
        boxShadow: '-8px 0 24px rgba(58, 41, 61, 0.18)',
      }
      /* 1px 视觉细线：绝对定位在业务区/会话边界上，不占布局宽度 */
      const splitterStyle = {
        position: 'absolute', top: 0, bottom: 0, width: 1, marginRight: -0.5,
        zIndex: 2, background: '#e6e0e7', cursor: 'col-resize', touchAction: 'none',
        transition: 'background .15s ease, box-shadow .15s ease',
      }
      const splitterHoverStyle = {
        ...splitterStyle, background: SPLITTER_BRAND,
        boxShadow: `0 0 6px ${splitterRgba(SPLITTER_BRAND, 0.55)}`,
      }
      const splitterDragStyle = {
        ...splitterHoverStyle,
        boxShadow: `0 0 10px ${splitterRgba(SPLITTER_BRAND, 0.8)}`,
      }
      /* 拖动命中面积由 11px 透明热区提供，线条本身不变粗 */
      const splitterHitStyle = {
        position: 'absolute', top: 0, bottom: 0, left: -5, width: 11,
        background: 'transparent', cursor: 'col-resize',
      }
      const splitterGripStyle = {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 14, height: 22, borderRadius: 4, background: SPLITTER_BRAND,
        color: '#fff', fontSize: 11, lineHeight: '22px', letterSpacing: '-1px', textAlign: 'center',
        opacity: 0.95, pointerEvents: 'none', userSelect: 'none',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.18)',
      }
      /* 拖动遮罩：指针掠过业务 iframe 时事件仍归文档，拖动不断 */
      const dragShieldStyle = {
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 4, cursor: 'col-resize', background: 'transparent', touchAction: 'none',
      }
      const padStyle = { display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', padding: 20, color: '#69656c', fontSize: 12.5, lineHeight: 1.75 }

      /* 业务区：iframe 原样保留；探不到界面才退回原骨架（原顶栏按钮移入外壳顶栏） */
      const business = uiBroken
        ? h('main', { className: 'wb-myeloma-workbench', 'data-font': large ? 'large' : 'standard', style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: 20, overflow: 'auto' } },
          h('style', null, theme),
          h('style', null, primerTheme),
          h('section', { className: 'wb-status-card', 'aria-label': '病程状态卡', 'data-status-card': 'dplus' },
            h('div', { className: 'wb-status-head' },
              h('span', { className: 'wb-status-eyebrow' }, 'D+N 状态卡 · 距下一次复查'),
              h('span', { className: 'wb-status-anchor' }, '尚未记录锚点日')),
            h('div', { className: 'wb-status-main' },
              h('strong', { className: 'wb-status-day' }, '待初始化'),
              h('div', { className: 'wb-status-current' },
                h('b', null, '尚未记录治疗线'),
                h('span', null, '待初始化 · 下次：待登记（复诊日期未录入）'))),
            h('div', { className: 'wb-status-actions' },
              h('button', { className: 'wb-primary', type: 'button', 'aria-expanded': guideOpen ? 'true' : 'false', onClick: () => setGuideOpen(!guideOpen) }, '开始三步初始化 →'),
              h('button', { type: 'button', 'data-primer-open': '', onClick: openPrimer, 'aria-haspopup': 'dialog', 'aria-controls': 'wb-disease-primer', 'aria-label': '疾病概要：定义、医学资料与指南情况、治疗全景、发展趋势' }, '疾病概要：多发性骨髓瘤是什么？')),
            guideOpen ? h('div', { className: 'wb-status-guide' },
              h('b', null, '三步初始化'),
              h('ol', null,
                h('li', null, '记录锚点日：自体移植回输日 = Day 0，或诱导治疗第 1 天 = D1。'),
                h('li', null, '选择当前阶段：诱导 / 移植 / 维持 / 复发后线 / 观察。'),
                h('li', null, '登记下一次复查日期与事项。')),
              h('p', null, '完成前不显示天数，也不推测阶段。')) : null),
          h('section', { style: { background: 'var(--wb-surface)', border: '1px solid var(--wb-line)', borderRadius: 'var(--wb-radius)', padding: 20 } },
            h('h1', { style: { fontSize: '1.6em', margin: '0 0 12px' } }, metadata.title),
            h('p', null, metadata.description),
            h('p', { role: 'status' }, error || (health ? '接入骨架：服务已连接，业务功能待按 spec 实现。' : '正在连接本机服务…')),
            h('button', { type: 'button', className: 'wb-primary', onClick: () => setAttempt((value) => value + 1) }, '重新检查连接')))
        : h('iframe', {
            key: attempt,
            ref: frameRef,
            src: UI_ENTRY,
            title: metadata.title,
            style: frameStyle,
            sandbox: 'allow-scripts allow-same-origin allow-forms allow-downloads',
            onLoad: () => setNote(''),
          })

      return h(React.Fragment, null,
        h('div', { style: rootStyle },
          /* 顶栏：保留原结构（标题 / 版本 / 疾病概要 / 大字），右侧按钮组加「AI 对话」入口 */
          h('header', { style: headerStyle },
            h('strong', { style: brandStyle }, metadata.title),
            h('span', { 'aria-live': 'polite', style: verStyle }, health ? `v${health.version}` : '版本待连接'),
            h('span', { style: hintStyle }, hasConversation
              ? '右侧是 DSH 原生会话：可拖中间分隔边调整宽度（25%–45%），收起不会结束会话。'
              : '还没有会话。点右侧「AI 对话」调起原生会话，开场白只填进草稿，不自动发送。'),
            h('div', { style: headerActionsStyle },
              uiBroken ? h('button', { type: 'button', style: smallStyle, 'data-primer-open': '', onClick: openPrimer, 'aria-haspopup': 'dialog', 'aria-controls': 'wb-disease-primer', 'aria-expanded': primerOpen ? 'true' : 'false', 'aria-label': '疾病概要：定义、医学资料与指南情况、治疗全景、发展趋势', title: '疾病概要：定义 · 指南 · 治疗全景 · 趋势' }, '?') : null,
              uiBroken ? h('button', { type: 'button', style: smallStyle, 'aria-pressed': large, onClick: () => setLarge(!large) }, large ? '标准字' : '大字') : null,
              h('button', {
                type: 'button',
                style: ghostStyle,
                onClick: pickDataDir,
                'aria-label': dataDir ? `配置目录：当前 ${dataDir}` : '配置资料目录',
                title: dataDir ? `当前资料目录：${dataDir}` : '选择本机资料目录',
              }, dataDir ? '配置目录 · 已设' : '配置目录'),
              h('button', {
                type: 'button',
                style: buttonStyle,
                onClick: onAgentClick,
                disabled: connecting || !canOpenSession,
                'aria-label': `AI 对话：${agentLabel}`,
              }, agentLabel),
              /* 会话已绑定时给独立的收起控件，不把关闭藏在面板内部 */
              hasConversation && paneOpen
                ? h('button', { type: 'button', style: ghostStyle, onClick: () => setPaneOpen(false), 'aria-label': '收起 AI 对话面板' }, '×')
                : null,
              note ? h('span', { role: 'status', style: noteStyle }, note) : null)),
          h('div', { ref: shellRef, style: bodyStyle },
            h('div', { style: businessStyle }, business),
            /* splitter 必须夹在业务区与 aside 之间：DOM 顺序为 业务区 → splitter → aside */
            !narrow && paneVisible ? h('div', {
              role: 'separator',
              'aria-orientation': 'vertical',
              'aria-label': '调整 AI 对话面板宽度',
              'aria-valuemin': Math.round(AGENT_MIN * 100),
              'aria-valuemax': Math.round(AGENT_MAX * 100),
              'aria-valuenow': percent,
              tabIndex: 0,
              style: {
                ...(dragging ? splitterDragStyle : hovering ? splitterHoverStyle : splitterStyle),
                right: `${percent}%`,
              },
              onPointerDown: onSplitterPointerDown,
              onPointerEnter: () => setHovering(true),
              onPointerLeave: () => setHovering(false),
              onKeyDown: onSplitterKeyDown,
            },
              h('span', { style: splitterHitStyle, 'aria-hidden': 'true' }),
              (hovering || dragging) ? h('span', { style: splitterGripStyle, 'aria-hidden': 'true' }, '⠿') : null) : null,
            /* 原生会话常挂载：显隐只用 display，卸载会丢输入框与草稿 */
            h('aside', {
              style: {
                ...paneStyle,
                ...(narrow ? drawerStyle : null),
                width: narrow ? `min(92%, ${DRAWER_MAX}px)` : `${percent}%`,
                display: paneVisible ? 'flex' : 'none',
              },
              'aria-label': 'AI 对话',
              'aria-hidden': paneVisible ? undefined : 'true',
            }, conversation || h('div', { style: padStyle },
              h('b', null, 'AI 对话还没开始'),
              h('span', null, '点顶栏「AI 对话」调起 DSH 原生会话后，它会固定出现在这一侧。'),
              h('span', null, '没有会话也不影响记录：业务区照常可用。'))),
            /* 拖动遮罩：指针掠过业务 iframe 时事件仍归文档，拖动不断 */
            dragging && !narrow ? h('div', { style: dragShieldStyle, 'aria-hidden': 'true' }) : null)),
        h(PrimerOverlay, { open: primerOpen, onClose: () => setPrimerOpen(false), panelRef }))
    }
    function apply(ctx) {
      bridge = ctx
      ctx.effect(() => ctx.desktopWorkbenches.register({"title":"多发性骨髓瘤患者工作台","repository":"https://github.com/xyb-openharness-dsh-plugins/myeloma-workbench","description":"面向多发性骨髓瘤患者与照护者的本机病程资料、M 蛋白与游离轻链监测、治疗线循环、自体移植档案、骨事件与骨保护、感染与疫苗工作台设计项目","customFrame":true}, Panel))
    }
    return { apply, inject: ['desktopWorkbenches', 'sessions'] }
  }
})
