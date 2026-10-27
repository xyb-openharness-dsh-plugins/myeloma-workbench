/* 36 号 · 疾病概要（多发性骨髓瘤）数据
 * 四段固定顺序：definition → evidence → landscape → trend。
 * 内容与 README「## 疾病概要」及 docs/DISEASE-PRIMER.md 同源；只做公开信息整理，不写临床判断。
 * 链接状态：逐条用 primer-backfill-2026-10-27/verify-links.mjs 实测，只保留 OK；拿不到的如实标注。
 */
window.DISEASE_PRIMER = {
  brand: '小浆宝 MyeloPal',
  name: '多发性骨髓瘤',
  en: 'Multiple Myeloma（MM）',
  updated: '2026-10-27',
  sections: [
    {
      id: 'definition',
      title: '定义',
      intro: '多发性骨髓瘤（multiple myeloma，MM）是以克隆性浆细胞增殖为特征的浆细胞肿瘤。浆细胞主要位于骨髓，异常克隆可产生单克隆免疫球蛋白或其片段（M 蛋白），疾病也可能出现溶骨性病灶。',
      points: [
        '疾病分类需与意义未明的单克隆丙种球蛋白病（MGUS）、冒烟型骨髓瘤（SMM）及浆细胞瘤等区分；诊断依据完整检查和临床团队记录，本台不自行判断。',
        'CRAB 框架涵盖高钙血症（C）、肾功能损害（R）、贫血（A）和骨病变（B）；SLiM 还涉及骨髓克隆性浆细胞比例、游离轻链比值和 MRI 病灶等定义事件。',
        '按分泌类型可见 IgG、IgA 等重链型及轻链型。轻链型记录可能需单独查看血清游离轻链（FLC），不能只凭单一检测推断病情。',
        'ISS / R-ISS 是分期框架；细胞遗传学结果与分期相关，但不是可互换字段。del(17p)、t(4;14) 等结果不由本台自动换算为个人风险结论。',
        '美国 SEER 2019–2023 数据报告诊断中位年龄为 69 岁，仅是美国人群统计，不代表其他地区分布或个人情况。'
      ],
      sources: [
        { org: 'IMWG', doc: 'Criteria for the Diagnosis of Multiple Myeloma（IMF 公开摘要）', version: '原始标准发表于 2014 年', original: false, secondaryUrl: 'https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma', note: '2014 原始论文 DOI 实测仅返回二进制（THIN），未取得可核对全文' },
        { org: 'WHO / IARC', doc: 'WHO Classification of Tumours Online: Haematolymphoid Tumours', version: '第 5 版 Volume 11；2024', original: false, secondaryUrl: 'https://whobluebooks.iarc.who.int/structures/haematolymphoid/', note: '在线分类层级可查看；完整出版内容未取得' },
        { org: 'NCI / SEER', doc: 'SEER Cancer Stat Facts: Myeloma', version: '统计期 2019–2023', original: true, kind: 'dataset', url: 'https://seer.cancer.gov/statfacts/html/mulmy.html', note: '美国人群统计，不外推到个人或其他地区' }
      ]
    },
    {
      id: 'evidence',
      title: '医学资料规范和指南情况',
      intro: '这个工作台里出现的每一条「该查什么、该怎么分期」，都应能追到下面某一份文件。未取得完整原件的，在表里如实标出，不假装看过。',
      table: {
        head: ['机构', '文件', '版本 / 年份', '原件', '本台的用途'],
        rows: [
          ['NCCN', 'Guidelines for Patients: Multiple Myeloma', '官方 PDF 地址；具体版次未核实',
            { text: '未取得可核对原件，据 NCCN 患者指南入口', kind: 'hub', url: 'https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients', note: '患者版 PDF 直链实测仅返回二进制（THIN），未取得可核对正文' },
            '患者版疾病与治疗信息入口；本台不引未核实条文'],
          ['NCCN', 'NCCN Clinical Practice Guidelines in Oncology: Multiple Myeloma', '官方目录索引可见 Version 2.2027；正文未核',
            { text: '官方入口 · 需自行注册（本台未取得该版正文）', kind: 'hub', url: 'https://www.nccn.org/guidelines/category_1', note: '临床版全文需在 NCCN 官网注册后取得' },
            '专业指南入口；引用前需确认正文版本与更新日期'],
          ['IMWG', 'Criteria for the Diagnosis of Multiple Myeloma', 'IMF 摘要对应的原始标准发表于 2014 年',
            { text: '未取得原件，据 IMF 公开摘要', kind: 'hub', url: 'https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma', note: 'IMF 公开摘要，非 2014 原始论文全文' },
            'CRAB、SLiM 与浆细胞疾病诊断框架入口'],
          ['IMWG', 'Consensus recommendations for risk stratification in multiple myeloma', '原始论文 2014；在线摘要页未标版本',
            { text: '未取得原件，据 IMF 公开摘要', kind: 'hub', url: 'https://www.myeloma.org/imwg/imwg-consensus-risk-stratification-multiple-myeloma', note: 'IMF 公开摘要，非原始论文全文' },
            '仅说明风险分层资料来源，不推导个人风险'],
          ['CSCO', '2025 指南汇编信息与骨髓瘤更新解读回放', '汇编信息页发布于 2026-05-06；会议回放标注 2025',
            { text: '未取得原件，据 CSCO 指南汇编信息页', kind: 'hub', url: 'https://www.csco.org.cn/cn/ncontent.aspx?oid=9038', note: '指南汇编获取页，非指南全文' },
            '仅作获取入口和解读资料，不引指南条文'],
          ['WHO / IARC', 'WHO Classification of Tumours Online: Haematolymphoid Tumours', '第 5 版 Volume 11；2024',
            { text: '未取得完整出版内容，据在线分类入口', kind: 'hub', url: 'https://whobluebooks.iarc.who.int/structures/haematolymphoid/', note: '在线分类入口，完整出版内容需订阅或图书' },
            '疾病分类入口，不是治疗指南'],
          ['NCI', 'Myeloma Treatment (PDQ), Health Professional Version', '最近更新 2025-04-25',
            { text: '已取得：公开二次资料全文页', kind: 'fulltext', url: 'https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq', note: '公开全文页' },
            '补充美国语境疾病背景与治疗类别，不替代本地指南'],
          ['SEER', 'Cancer Stat Facts: Myeloma', '统计期 2019–2023',
            { text: '已取得：公开人群统计数据集页', kind: 'dataset', url: 'https://seer.cancer.gov/statfacts/html/mulmy.html', note: '公开人群统计' },
            '人群背景示例，不外推到个人或其他地区']
        ]
      },
      points: [
        '指南给的是「通常怎么做」，不是「你该怎么做」。版本号必须写清：同一份指南隔一年，条目会变。',
        '未取得完整原件的资料只登记入口、版本状态和用途，不引用未核对的条文、推荐等级或剂量。',
        '表中「原件」列可点击的链接只代表来源入口已核对；链接可访问不等于取得或审阅全文。'
      ],
      sources: [
        { org: 'NCCN', doc: 'NCCN Guidelines · Multiple Myeloma', version: 'Version 2.2027（仅目录索引）', entry: true, kind: 'hub', url: 'https://www.nccn.org/guidelines/category_1', note: 'NCCN 指南目录中的 Multiple Myeloma 条目；临床版全文需在 NCCN 官网注册后取得，本台未取得该版原件' },
        { org: 'IMWG', doc: 'Criteria for the Diagnosis of Multiple Myeloma', version: '2014', original: false, secondaryUrl: 'https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma', note: '未取得原件，据 IMF 公开摘要' },
        { org: 'WHO / IARC', doc: 'Haematolymphoid Tumours（第 5 版 Volume 11）', version: '2024', original: false, secondaryUrl: 'https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024', note: '官方出版信息；完整内容需通过图书或订阅访问' },
        { org: 'NCI', doc: 'Myeloma Treatment (PDQ), Health Professional Version', version: '2025-04-25', original: true, kind: 'fulltext', url: 'https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq', note: '美国语境二次资料' },
        { org: 'NCI / SEER', doc: 'SEER Cancer Stat Facts: Myeloma', version: '2019–2023', original: true, kind: 'dataset', url: 'https://seer.cancer.gov/statfacts/html/mulmy.html', note: '美国人群统计' }
      ]
    },
    {
      id: 'landscape',
      title: '目前治疗全景概要',
      intro: '下面按病程阶段列出指南与资料里出现的治疗类别，用来识别术语；不比较方案，不给治疗顺序或个人适用性判断。',
      groups: [
        {
          label: '初治阶段 · 诱导治疗',
          points: [
            '可能涉及蛋白酶体抑制剂、免疫调节剂、抗 CD38 单抗及糖皮质激素等药物类别；组合依指南版本和临床背景而异。',
            '传统化疗类别在部分情形下被列出；是否采用、采用哪一种，属于医生判断。'
          ]
        },
        {
          label: '部分患者的治疗环节 · 自体造血干细胞移植',
          points: [
            '涉及干细胞动员、采集、预处理、回输及恢复随访等环节。',
            '本工作台只记录日期和原始资料，不评估是否适合移植。'
          ]
        },
        {
          label: '治疗后阶段 · 巩固与维持',
          points: [
            '可包含巩固治疗及维持治疗类别；方案与持续时间以医生记录和当前指南原文为准。'
          ]
        },
        {
          label: '复发或难治阶段 · 后线治疗与研究',
          points: [
            '可能涉及换用未使用过的药物类别、参加临床研究、细胞治疗与双特异性抗体类等类别。',
            '国内获批状态与可及性需另行核实。'
          ]
        },
        {
          label: '全程支持与复查',
          points: [
            '骨保护（双膦酸盐 / 地舒单抗类别）、感染预防与疫苗、肾功能相关处理、贫血与血钙的处理类别。',
            '复查包括 M 蛋白、游离轻链、血常规、血钙 / 肌酐及影像等，依临床安排；本台只记录数值、日期、单位、来源与方法。'
          ]
        }
      ],
      points: [
        '以上是文献与指南里列出的手段，按病期与线序排列，不代表任何一项适合你。选哪一个，这一句需要问你的医生。'
      ],
      sources: [
        { org: 'NCCN', doc: 'NCCN Guidelines · Multiple Myeloma', version: 'Version 2.2027（仅目录索引）', entry: true, kind: 'hub', url: 'https://www.nccn.org/guidelines/category_1', note: 'NCCN 指南目录中的 Multiple Myeloma 条目；临床版全文需在 NCCN 官网注册后取得，本台未取得该版原件' },
        { org: 'NCI', doc: 'Myeloma Treatment (PDQ), Health Professional Version', version: '2025-04-25', original: true, kind: 'fulltext', url: 'https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq', note: '美国语境二次资料' },
        { org: 'CSCO', doc: '2025 指南汇编信息', version: '页面发布于 2026-05-06', original: false, secondaryUrl: 'https://www.csco.org.cn/cn/ncontent.aspx?oid=9038', note: '未取得指南全文，仅作获取入口' }
      ]
    },
    {
      id: 'trend',
      title: '发展趋势',
      intro: '这一段只写已经发生的事：有日期、来源和明确统计口径。不写预测，不做评价，也不给任何倾向。',
      points: [
        '截至 2026-10-25：本项目用 6 个中英文检索词（多发性骨髓瘤 / 骨髓瘤 / 浆细胞瘤 / multiple myeloma / myeloma / plasma cell myeloma）在 unified_search_trials 采集到登记记录 257 条。',
        '口径：单平台、指定检索式、快照日 2026-10-25，不是全量统计；I / II / III 期分布未统计，登记状态一律「未核实」。',
        '指南版本更替、监管批件、分类体系更新：本台尚未整理——项目 docs 没有版本号与更新日期可引，不补年份、不写批件号。'
      ],
      sources: [
        { org: '本项目', doc: 'research/myeloma-cancer/manifest.json（快照日 2026-10-25，采集工具 unified_search_trials）', version: '2026-10-25', nolink: true, note: '本机一手采集快照，无公开 URL；随仓库研究目录保存' }
      ]
    }
  ]
}
