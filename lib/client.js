window.__ModuleLoader__.load({
  id: "@xyb-community/myeloma-workbench",
  factory(require) {
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

    function Panel() {
      const [health, setHealth] = React.useState(null)
      const [error, setError] = React.useState('')
      const [large, setLarge] = React.useState(false)
      const [attempt, setAttempt] = React.useState(0)
      const [primerOpen, setPrimerOpen] = React.useState(false)
      const [guideOpen, setGuideOpen] = React.useState(false)
      const triggerRef = React.useRef(null)
      const panelRef = React.useRef(null)
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
      const openPrimer = (event) => { triggerRef.current = event.currentTarget; setPrimerOpen(true) }
      return h(React.Fragment, null,
        h('main', { className: 'wb-myeloma-workbench', 'data-font': large ? 'large' : 'standard', style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: 20, overflow: 'auto' } },
          h('header', { style: { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', paddingInlineStart: 'var(--dsh-frame-leading-clearance, 0px)' } },
            h('strong', null, metadata.title),
            h('span', { 'aria-live': 'polite' }, health ? `v${health.version}` : '版本待连接'),
            h('button', { className: 'wb-dp-trigger', type: 'button', 'data-primer-open': '', onClick: openPrimer, 'aria-haspopup': 'dialog', 'aria-controls': 'wb-disease-primer', 'aria-expanded': primerOpen ? 'true' : 'false', 'aria-label': '疾病概要：定义、医学资料与指南情况、治疗全景、发展趋势', title: '疾病概要：定义 · 指南 · 治疗全景 · 趋势' }, '?'),
            h('button', { type: 'button', 'aria-pressed': large, onClick: () => setLarge(!large) }, large ? '标准字' : '大字')),
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
            h('button', { type: 'button', className: 'wb-primary', onClick: () => setAttempt((value) => value + 1) }, '重新检查连接'))),
        h(PrimerOverlay, { open: primerOpen, onClose: () => setPrimerOpen(false), panelRef }))
    }
    function apply(ctx) {
      ctx.effect(() => ctx.desktopWorkbenches.register({"title":"多发性骨髓瘤患者工作台","repository":"https://github.com/xyb-openharness-dsh-plugins/myeloma-workbench","description":"面向多发性骨髓瘤患者与照护者的本机病程资料、M 蛋白与游离轻链监测、治疗线循环、自体移植档案、骨事件与骨保护、感染与疫苗工作台设计项目","customFrame":true}, Panel))
    }
    return { apply, inject: ['desktopWorkbenches'] }
  }
})
