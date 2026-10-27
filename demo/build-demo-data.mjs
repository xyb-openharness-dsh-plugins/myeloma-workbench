#!/usr/bin/env node
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

export function buildDemoProfiles() {
  return [
    {
      id: 'profile-a', name: '林先生的资料', age: 68, diagnosis: '多发性骨髓瘤', role: '患者自报', city: '杭州',
      metrics: [
        { key: 'mProtein', label: 'M 蛋白', unit: 'g/L', values: [{ d: '2026-05-12', v: 18.2 }, { d: '2026-06-16', v: 12.4 }, { d: '2026-07-21', v: 8.6 }, { d: '2026-09-02', v: 7.9 }, { d: '2026-10-08', v: 8.1 }], note: '仅并列同一示例方法的记录；不据此判断复发或疗效。' },
        { key: 'flc', label: '游离轻链 κ/λ', unit: '比值', values: [{ d: '2026-05-12', v: 42 }, { d: '2026-06-16', v: 28 }, { d: '2026-07-21', v: 19 }, { d: '2026-09-02', v: 17 }, { d: '2026-10-08', v: 18 }], note: '单位与检测方法需以原始报告为准。' },
      ],
      markers: [
        { id: 'm1', type: 'pathology', label: '病理类型', value: 'IgG-κ 型浆细胞肿瘤', date: '2026-02-18', source: '骨髓病理报告（合成）', status: 'confirmed' },
        { id: 'm2', type: 'gene', label: '细胞遗传学', value: 't(11;14) 检出', date: '2026-02-18', source: 'FISH 报告（合成）', status: 'confirmed' },
        { id: 'm3', type: 'ihc', label: 'IHC', value: 'CD138 阳性（原报告记录）', date: '2026-02-18', source: '骨髓病理报告（合成）', status: 'confirmed' },
        { id: 'm4', type: 'gene', label: 'del(17p)', value: '待核对原报告', date: '2026-02-18', source: '导入候选（合成）', status: 'candidate' },
      ],
      lines: [
        { id: 'line-1', phase: '第 1 线 · 诱导治疗', start: '2026-02-20', end: '2026-06-20', summary: 'VRd 方案记录；周期日期以治疗记录为准。', regimen: ['VRd（硼替佐米 / 来那度胺 / 地塞米松），报告原文方案简称', '计划：每 28 天一周期 · 实际：共 4 个周期（演示）', '起止：2026-02-20 至 2026-06-20'], metrics: ['M 蛋白：2026-05-12 · 18.2 g/L；2026-06-16 · 12.4 g/L', 'κ/λ：2026-05-12 · 42；2026-06-16 · 28', '记录仅按日期并列；检测方法变化待核'], imaging: ['2026-06-10 PET/CT 原文摘要（合成）：骨髓多发灶代谢较前降低。', '影像原文尚未关联文件；显示摘要不构成影像判读。'], ae: ['2026-04-08 病历记载：手足麻木；等级原文未记录。', '处理原文：复诊时讨论（合成）；本工作台不作药物归因。'], support: ['营养：记录存在（演示），具体内容待患者确认。', '心理支持效果原话：“有人陪我把报告按日期放好，复诊时没那么慌。”（合成）'] },
        { id: 'line-2', phase: '第 2 线 · 移植后维持', start: '2026-07-15', end: '至今', summary: '移植后维持阶段；下次评估日期待医生记录。', regimen: ['来那度胺维持（合成记录），剂量与处方原件待核。', '计划 vs 实际：计划按医嘱持续；本演示不推算疗程。', '起始：2026-07-15；结束：进行中'], metrics: ['M 蛋白：2026-09-02 · 7.9 g/L；2026-10-08 · 8.1 g/L', 'κ/λ：2026-09-02 · 17；2026-10-08 · 18', '与前期记录并列，不写趋势结论。'], imaging: ['本阶段无影像记录；原因：尚未导入报告。'], ae: ['本阶段未录入不良反应总结；不代表没有症状。'], support: ['营养/心理记录：暂无本阶段记录。', '支持措施效果以患者原话补录，不由系统推断。'] },
      ],
      transplant: [{ date: '2026-07-01', name: '干细胞回输', source: '移植出院小结（合成）' }, { date: '2026-07-13', name: '植入记录', source: '病程记录（合成）' }, { date: '2026-08-06', name: '出院后复查', source: '门诊记录（合成）' }],
      boneEvents: [{ date: '2026-03-11', name: '胸背部疼痛记录', note: '患者自述，具体部位见原始记录（合成）；未作病因判断。' }],
      infections: [{ date: '2026-08-19', name: '发热就诊记录', note: '诊疗记录原文待补；此处仅展示事件日期（合成）。' }],
      vaccines: [{ date: '2026-04-02', name: '流感疫苗记录', note: '仅作既往记录，不形成接种计划（合成）。' }],
      caregiver: { author: '女儿（照护者代记）', basis: '陪同复诊观察', visibility: '患者可见范围待确认' },
    },
    {
      id: 'profile-b', name: '陈女士的资料', age: 74, diagnosis: '多发性骨髓瘤', role: '女儿代记', city: '南京',
      metrics: [
        { key: 'mProtein', label: 'M 蛋白', unit: 'g/L', values: [{ d: '2026-05-08', v: null }, { d: '2026-06-13', v: null }, { d: '2026-07-19', v: null }, { d: '2026-09-04', v: null }, { d: '2026-10-10', v: null }], note: '本合成档案未录入可用 M 蛋白值；空值不以零代替。' },
        { key: 'flc', label: '游离轻链 λ', unit: 'mg/L', values: [{ d: '2026-05-08', v: 180 }, { d: '2026-06-13', v: 142 }, { d: '2026-07-19', v: 116 }, { d: '2026-09-04', v: 109 }, { d: '2026-10-10', v: 112 }], note: '单条示例曲线，不评价变化。' },
      ],
      markers: [
        { id: 'b1', type: 'pathology', label: '病理类型', value: '轻链型（报告原文待核）', date: '2026-01-30', source: '骨髓报告导入候选（合成）', status: 'candidate' },
        { id: 'b2', type: 'gene', label: '细胞遗传学', value: '未记录', date: '', source: '暂无已确认报告', status: 'missing' },
        { id: 'b3', type: 'ihc', label: 'IHC', value: '未记录', date: '', source: '暂无已确认报告', status: 'missing' },
      ],
      lines: [{ id: 'line-b1', phase: '第 1 线 · 治疗方案待核对', start: '2026-01-30', end: '至今', summary: '照护者代记资料；方案原文尚未确认入档。', regimen: ['治疗方案：未记录；请核对处方/病历原文。', '计划 vs 实际：未建立。', '起始日期来自演示档案，待核实。'], metrics: ['M 蛋白：未记录可用数值。', '游离轻链：2026-10-10 · 112 mg/L（合成）。', '缺少检测方法与参考范围，不能作数值比较。'], imaging: ['无已确认影像记录；说明：档案尚未补充。'], ae: ['无已确认不良反应记录；这不表示没有不良反应。'], support: ['营养/心理：尚无记录。', '支持效果暂无患者原话。'] }],
      transplant: [], boneEvents: [], infections: [], vaccines: [],
      caregiver: { author: '女儿（照护者代记）', basis: '依据门诊陪同与病历摘要', visibility: '默认私密，待患者确认披露范围' },
    },
  ];
}

function makeDemoTrials() {
  return [
    { id: 'DEMO-MM-001', title: '抗 BCMA 方案用于复发/难治多发性骨髓瘤的研究线索', kind: '结构化示例', synthetic: true, keywords: ['多发性骨髓瘤', 'BCMA'], criteria: [{ type: '文本命中', field: '疾病名称', value: '多发性骨髓瘤', text: '合成示例标题片段：“抗 BCMA 方案用于复发/难治多发性骨髓瘤”。文本命中是检索证据，不作条件计数。' }, { type: '结构化命中', field: '细胞遗传学', markerId: 'm2', expected: 't(11;14)', value: 't(11;14) 检出（已确认）', text: '合成示例条件原文：要求报告记载 t(11;14)。' }, { type: '结构化命中', field: '病理类型', markerId: 'm1', expected: 'IgG-κ', value: 'IgG-κ 型（已确认）', text: '合成示例条件：病理报告记载 IgG-κ 型。' }, { type: '无法自动匹配', field: '体能状态', value: '未建档 ECOG 评分', text: '合成示例条件原文：要求 ECOG 评分在指定范围；当前档案无该字段。', reason: '本地未建档体能状态评分，需人工核对。' }], conditions: [{ field: '细胞遗传学', category: '细胞遗传学', markerId: 'm2', expected: 't(11;14)', text: '合成条件：报告中记载 t(11;14)。' }, { field: '病理类型', category: '病理类型', markerId: 'm1', expected: 'IgG-κ', text: '合成条件：病理报告记载 IgG-κ 型。' }, { field: '体能状态', category: '体能状态', reason: '本地未建档 ECOG 评分', hard: true, text: '合成条件：需有 ECOG 评分记录。' }] },
    { id: 'DEMO-MM-002', title: '多发性骨髓瘤后线治疗的文本检索示例', kind: '文本命中示例', synthetic: true, keywords: ['多发性骨髓瘤', '后线治疗'], criteria: [{ type: '文本命中', field: '标题词', value: '多发性骨髓瘤、后线治疗', text: '合成文本片段：“多发性骨髓瘤后线治疗研究”。仅展示词语命中，不代表条件符合。' }, { type: '无法自动匹配', field: '治疗条件', value: '需完整条件原文', text: '合成示例条件：要求特定既往治疗；具体条件文本不可自动解析。', reason: '示例未提供可核验的结构化既往治疗条件。' }], conditions: [{ field: '既往治疗', category: '治疗史', reason: '需要完整治疗记录和条件原文对照', text: '合成条件：要求特定既往治疗史。' }, { field: '年龄', category: '年龄', reason: '年龄条件文本尚未结构化', text: '合成条件：需根据来源原文人工核对年龄范围。' }] },
    { id: 'DEMO-MM-003', title: '浆细胞疾病篮子研究的宽口径检索示例', kind: '宽口径线索', synthetic: true, keywords: ['浆细胞疾病'], criteria: [{ type: '宽口径命中', field: '宽口径词', value: '浆细胞疾病', text: '合成宽口径示例：标题提到“浆细胞疾病”。此类线索不说明试验针对多发性骨髓瘤。', reason: '仅宽口径词语相近，需人工查看条件原文。' }], conditions: [{ field: '诊断范围', category: '诊断', reason: '宽口径登记线索没有确认目标疾病范围', text: '合成条件：篮子研究是否覆盖本病种需核对条件原文。' }] },
  ];
}

function readSnapshot() {
  const dir = join(ROOT, 'research', 'myeloma-cancer');
  const manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8'));
  const rows = readFileSync(join(dir, 'trials-2026.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map((line) => JSON.parse(line));
  const db = new DatabaseSync(join(dir, 'myeloma_cancer_trials_2026.sqlite'), { readOnly: true });
  const statusRows = db.prepare(`SELECT source_id, state, reason_code, coverage, completeness
    FROM source_statuses ORDER BY source_id, state, reason_code`).all();
  db.close();
  const sourceStateGroups = new Map();
  for (const row of statusRows) {
    const key = JSON.stringify([row.source_id, row.state, row.reason_code]);
    if (!sourceStateGroups.has(key)) {
      sourceStateGroups.set(key, {
        source_id: row.source_id,
        state: row.state,
        reason_code: row.reason_code,
        statusRowCount: 0,
        coverages: new Map(),
        completenessReports: new Map(),
      });
    }
    const group = sourceStateGroups.get(key);
    group.statusRowCount += 1;
    if (row.coverage) group.coverages.set(row.coverage, JSON.parse(row.coverage));
    if (row.completeness) group.completenessReports.set(row.completeness, JSON.parse(row.completeness));
  }
  const sourceStates = [...sourceStateGroups.values()].map((group) => {
    const coverages = [...group.coverages.values()];
    const completenessReports = [...group.completenessReports.values()];
    const union = (field) => [...new Set(coverages.flatMap((coverage) => coverage?.[field] || []))];
    const sourcePrefix = `${group.source_id}:`.toLowerCase();
    const warnings = [...new Set(completenessReports.flatMap((report) => report?.warnings || []))]
      .filter((warning) => warning.toLowerCase().startsWith(sourcePrefix))
      .map((warning) => warning.slice(group.source_id.length + 1).trim());
    return {
      source_id: group.source_id,
      state: group.state,
      reason_code: group.reason_code,
      statusRowCount: group.statusRowCount,
      queriedSources: union('queried'),
      unavailableSources: union('unavailable'),
      notQueriedSources: union('notQueried'),
      warnings,
    };
  });
  const coverageSummary = {
    queried: [...new Set(sourceStates.flatMap((row) => row.queriedSources))],
    unavailable: [...new Set(sourceStates.flatMap((row) => row.unavailableSources))],
    notQueried: [...new Set(sourceStates.flatMap((row) => row.notQueriedSources))],
  };
  const relevant = rows.filter((r) => /骨髓瘤|浆细胞|myeloma|plasma cell|BCMA|CAR.?T/i.test(r.title || '')).slice(0, 48);
  return {
    snapshotDate: manifest.snapshotDate,
    recordCount: manifest.recordCount,
    sourceStatusRows: manifest.sourceStatusRows,
    queries: manifest.queries,
    coverageSummary,
    sourceStates,
    trials: relevant.map((r) => ({ id: r.recordId, sourceId: r.sourceId, title: r.title, registryNumbers: r.registryNumbers || [], sourceUrl: r.sourceUrl || '', retrievedAt: r.retrievedAt || '', statusNote: r.statusNote, snapshotDate: r.snapshotDate })),
  };
}

function emitJs(data, version) {
  return `// Generated by demo/build-demo-data.mjs; synthetic profiles + real dated snapshot excerpt.\n` +
    `const APP_VERSION = ${JSON.stringify(version)};\n` +
    `const DEMO_DATA = ${JSON.stringify(data)};\n` +
    `window.MYELOPAL = Object.freeze({ version: APP_VERSION, data: DEMO_DATA });\n`;
}

export function buildDemoData(snapshot, version) {
  return { profiles: buildDemoProfiles(), trials: makeDemoTrials(), snapshot, version };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const version = readFileSync(join(ROOT, 'VERSION'), 'utf8').trim();
  const data = buildDemoData(readSnapshot(), version);
  const jsPath = join(ROOT, 'prototypes', 'v0.2', 'demo-data.js');
  const sqlitePath = join(ROOT, 'demo', 'demo-data.sqlite');
  const jsTempPath = `${jsPath}.${process.pid}.tmp`;
  const sqliteTempPath = `${dirname(sqlitePath)}/demo-data-${process.pid}.tmp.sqlite`;
  mkdirSync(dirname(jsPath), { recursive: true });
  mkdirSync(dirname(sqlitePath), { recursive: true });
  writeFileSync(jsTempPath, emitJs(data, version));
  const db = new DatabaseSync(sqliteTempPath);
  db.exec(`CREATE TABLE demo_profiles (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE snapshot_trials (id TEXT PRIMARY KEY, source_id TEXT NOT NULL, title TEXT NOT NULL, snapshot_date TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE snapshot_source_states (source_id TEXT NOT NULL, state TEXT NOT NULL, reason_code TEXT, status_row_count INTEGER NOT NULL, payload TEXT NOT NULL);`);
  const profileStmt = db.prepare('INSERT INTO demo_profiles VALUES (?, ?)');
  const trialStmt = db.prepare('INSERT INTO snapshot_trials VALUES (?, ?, ?, ?, ?)');
  const stateStmt = db.prepare('INSERT INTO snapshot_source_states VALUES (?, ?, ?, ?, ?)');
  for (const profile of data.profiles) profileStmt.run(profile.id, JSON.stringify(profile));
  for (const trial of data.snapshot.trials) trialStmt.run(trial.id, trial.sourceId, trial.title, trial.snapshotDate, JSON.stringify(trial));
  for (const state of data.snapshot.sourceStates) stateStmt.run(state.source_id, state.state, state.reason_code, state.statusRowCount, JSON.stringify(state));
  db.close();
  renameSync(sqliteTempPath, sqlitePath);
  renameSync(jsTempPath, jsPath);
  const sha = createHash('sha256').update(readFileSync(jsPath)).digest('hex');
  console.log(JSON.stringify({ profiles: data.profiles.length, trials: data.snapshot.trials.length, sourceStates: data.snapshot.sourceStates.length, snapshotDate: data.snapshot.snapshotDate, jsPath, sqlitePath, jsSha256: sha }, null, 2));
}
