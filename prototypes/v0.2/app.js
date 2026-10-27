(() => {
  'use strict';
  const APP = window.MYELOPAL;
  const state = { profileIndex: 0, view: 'home', trialTab: 'profile', query: '', trialSource: 'all', saved: [], questions: [], confirmedByProfile: {}, manualMarkersByProfile: {}, pageStack: [], pageScroll: 0, trigger: null, font: 0, calendarMonth: '', calendarDate: '', maintenanceMode: '', maintenanceText: '', candidateSeq: 0, candidateLabel: '', candidateValue: '', candidateSource: '', candidateDate: '' };
  const EVIDENCE_TIERS = ['结构化命中', '文本命中', '无法自动匹配', '宽口径命中'];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const P = () => APP.data.profiles[state.profileIndex];
  const VIEWS = {
    home: ['看板', '把病程资料放在一起，复诊时更容易找到。'],
    primer: ['病情介绍', '了解多发性骨髓瘤与本项目资料整理的边界。'],
    calendar: ['病程日历', '按来源日期回看已记录的检查、治疗与照护事件。'],
    metrics: ['指标趋势', '按报告日期查看指标记录，不把单个数字解释成病情结论。'],
    treatment: ['治疗线', '每条线先看阶段概要；需要时展开治疗、指标、影像、副作用和支持记录。'],
    transplant: ['移植档案', '只按记录回顾采集、回输、植入和出院节点。'],
    bone: ['骨事件', '并列记录骨痛、影像原文与骨保护用药，不推断病因。'],
    infection: ['感染与疫苗', '回顾感染事件、免疫球蛋白和既往疫苗记录。'],
    support: ['照护支持', '患者自报与照护者代记分别记录。'],
    visit: ['复诊准备', '整理已确认记录和准备询问医生的问题。'],
    trials: ['临床试验', '查找带来源的研究线索，不判断资格。'],
    records: ['资料核对', '导入候选逐项核对；未确认内容不参与临床线索匹配。'],
  };

  function setHeader() {
    $('#versionTop').textContent = `v${APP.version}`;
    $('#versionBottom').textContent = `v${APP.version}`;
    $('#profileName').textContent = P().name;
    $('#profileMeta').textContent = `${P().age} 岁 · ${P().role}`;
    $('#profileAvatar').textContent = P().name.slice(0, 1);
    const [title, context] = VIEWS[state.view] || VIEWS.home;
    $('#topContext').textContent = context;
    document.title = `小浆宝 MyeloPal · ${title} · v${APP.version}`;
  }
  function pageHead(title, sub, action = '') {
    return `<div class="page-title-row"><div><div class="eyebrow-line"><span class="flower">✿</span>MYELOPAL · ${esc(P().role.toUpperCase())}</div><h1>${esc(title)}</h1><p>${esc(sub)}</p></div>${action}</div>`;
  }
  function cardHead(title, sub, suffix = '') { return `<div class="card-head"><div><h2>${esc(title)}</h2><p>${esc(sub)}</p></div>${suffix}</div>`; }
  function tag(text, kind = '') { return `<span class="tag ${kind}">${esc(text)}</span>`; }
  function miniSpark(values, label, unit) {
    const valid = values.filter((x) => Number.isFinite(x.v));
    if (!valid.length) return `<div class="empty-state"><b>${esc(label)}尚无可绘制记录</b>空档案不以零值连线；补入已核对的报告后再查看。</div>`;
    const min = Math.min(...valid.map((x) => x.v)), max = Math.max(...valid.map((x) => x.v));
    const range = Math.max(1, max - min);
    const pts = valid.map((x, i) => `${18 + (i * 264) / Math.max(1, valid.length - 1)},${59 - ((x.v - min) / range) * 43}`).join(' ');
    return `<svg class="spark" viewBox="0 0 300 72" role="img" aria-label="${esc(label)}示例曲线，单位 ${esc(unit)}"><line x1="12" y1="16" x2="288" y2="16"/><line x1="12" y1="38" x2="288" y2="38"/><line x1="12" y1="60" x2="288" y2="60"/><polyline points="${pts}"/>${valid.map((x, i) => `<circle cx="${18 + (i * 264) / Math.max(1, valid.length - 1)}" cy="${59 - ((x.v - min) / range) * 43}" r="3.2"/>`).join('')}</svg>`;
  }
  function metricPanel(metric) {
    const last = metric.values.filter((x) => Number.isFinite(x.v)).at(-1);
    const hasLast = Boolean(last);
    return `<section class="card card-pad">${cardHead(metric.label, `演示记录 · 单位 ${metric.unit}`, tag(`${metric.values.length} 次`, 'plum'))}<div class="metric-line-head"><b>${hasLast ? `${esc(last.v)} ${esc(metric.unit)}` : '未记录'}</b><span>${hasLast ? esc(last.d) : '待补录'}</span></div>${miniSpark(metric.values, metric.label, metric.unit)}<p class="small-note">${esc(metric.note)}</p><details><summary>查看日期与来源</summary><div class="evidence-list">${metric.values.map((x) => `<div class="evidence-row"><b>${esc(x.d)} · ${Number.isFinite(x.v) ? `${esc(x.v)} ${esc(metric.unit)}` : '未记录'}</b><small>来源：合成演示报告；方法/参考范围需核原件。</small></div>`).join('')}</div></details></section>`;
  }
  function latestMetric(metric) { return metric.values.filter((x) => Number.isFinite(x.v)).at(-1); }
  function manualMarkers() { return state.manualMarkersByProfile[P().id] || (state.manualMarkersByProfile[P().id] = []); }
  function confirmedMarkers() { return state.confirmedByProfile[P().id] || (state.confirmedByProfile[P().id] = new Set()); }
  function currentMarkers() { return [...P().markers, ...manualMarkers()]; }
  function markerTypeFor(kind) { return kind === '治疗记录' ? 'treatment' : kind === '检查记录' ? 'observation' : kind === '其他病程资料' ? 'other' : 'pathology'; }
  function collectCalendarEvents(profile) {
    const events = [];
    profile.lines.forEach((line) => {
      if (line.start) events.push({ date: line.start, title: line.phase, detail: line.summary, kind: '治疗线', source: '治疗线记录' });
      if (line.end && line.end !== '至今') events.push({ date: line.end, title: `${line.phase}阶段结束记录`, detail: '仅按档案中的日期展示，计划与实际请核对原件。', kind: '治疗线', source: '治疗线记录' });
    });
    profile.metrics.forEach((metric) => metric.values.forEach((value) => {
      if (value.d && Number.isFinite(value.v)) events.push({ date: value.d, title: `${metric.label}检查`, detail: `${value.v} ${metric.unit}`, kind: '检查', source: '合成演示报告' });
    }));
    (profile.transplant || []).forEach((event) => events.push({ date: event.date, title: event.name, detail: event.source, kind: '移植', source: event.source }));
    (profile.boneEvents || []).forEach((event) => events.push({ date: event.date, title: event.name, detail: event.note, kind: '骨事件', source: '骨事件记录' }));
    (profile.infections || []).forEach((event) => events.push({ date: event.date, title: event.name, detail: event.note, kind: '感染', source: '感染记录' }));
    (profile.vaccines || []).forEach((event) => events.push({ date: event.date, title: event.name, detail: event.note, kind: '疫苗', source: '疫苗记录' }));
    manualMarkers().forEach((marker) => events.push({ date: marker.date, title: marker.label, detail: marker.value, kind: '档案', source: marker.source }));
    return events.filter((event) => /^\d{4}-\d{2}-\d{2}$/.test(event.date)).sort((a, b) => a.date.localeCompare(b.date));
  }
  function calendarView() {
    const events = collectCalendarEvents(P());
    const current = state.calendarMonth ? new Date(`${state.calendarMonth}-01T12:00:00`) : new Date();
    if (!state.calendarMonth) state.calendarMonth = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
    const [year, month] = state.calendarMonth.split('-').map(Number);
    const first = new Date(year, month - 1, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month, 0).getDate();
    const byDate = new Map();
    events.filter((event) => event.date.startsWith(state.calendarMonth)).forEach((event) => {
      if (!byDate.has(event.date)) byDate.set(event.date, []);
      byDate.get(event.date).push(event);
    });
    const cells = Array.from({ length: Math.ceil((startOffset + daysInMonth) / 7) * 7 }, (_, index) => {
      const day = index - startOffset + 1;
      if (day < 1 || day > daysInMonth) return '<div class="calendar-cell is-empty" aria-hidden="true"></div>';
      const date = `${state.calendarMonth}-${String(day).padStart(2, '0')}`;
      const items = byDate.get(date) || [];
      return `<button class="calendar-cell ${items.length ? 'has-events' : ''} ${state.calendarDate === date ? 'is-selected' : ''}" data-action="calendar-day" data-date="${date}" aria-pressed="${state.calendarDate === date}"><span class="calendar-day-number">${day}</span>${items.slice(0, 2).map((event) => `<span class="calendar-event-dot">${esc(event.kind)}</span>`).join('')}${items.length > 2 ? `<span class="calendar-event-dot">另有 ${items.length - 2} 条</span>` : ''}</button>`;
    }).join('');
    const selected = state.calendarDate ? events.filter((event) => event.date === state.calendarDate) : events.filter((event) => event.date.startsWith(state.calendarMonth));
    return `${pageHead('病程日历','只把已有治疗、检查和照护记录按来源日期放入日历；未登记的安排保持空白。')}
      <div class="notice soft">此处没有根据周期文本推算每日给药或预约日期。尚未记录的事项不会被补成日程。</div>
      <section class="card card-pad calendar-card"><div class="calendar-toolbar"><button class="button secondary" data-action="calendar-shift" data-delta="-1" aria-label="上一个月">上个月</button><h2>${year} 年 ${month} 月</h2><button class="button secondary" data-action="calendar-shift" data-delta="1" aria-label="下一个月">下个月</button></div><div class="calendar-grid calendar-weekdays">${['一','二','三','四','五','六','日'].map((day) => `<b>${day}</b>`).join('')}</div><div class="calendar-grid">${cells}</div></section>
      <section class="card card-pad calendar-details">${cardHead(state.calendarDate || `${year}-${String(month).padStart(2, '0')}`, '档案已登记事件', tag(`${selected.length} 条`, 'plum'))}${selected.length ? selected.map((event) => `<div class="calendar-detail-row"><time>${esc(event.date)}</time><div><b>${esc(event.title)}</b><p>${esc(event.detail)}</p><small>${esc(event.kind)} · 来源：${esc(event.source)}</small></div></div>`).join('') : '<div class="empty-state"><b>这个日期没有已登记事项</b>空白表示档案没有记录，不代表没有发生。</div>'}</section>`;
  }
  function homeView() {
    const m = P().metrics;
    const ml = latestMetric(m[0]), flc = latestMetric(m[1]);
    const line = P().lines.at(-1);
    const next = [
      { date: ml?.d || '待补录', title: `M 蛋白记录 · ${ml ? `${ml.v} ${m[0].unit}` : '未记录'}`, sub: '来源日期 · 合成演示档案' },
      { date: flc?.d || '待补录', title: `游离轻链记录 · ${flc ? `${flc.v} ${m[1].unit}` : '未记录'}`, sub: '请核对检测方法与单位' },
      ...(line ? [{ date: line.start, title: line.phase, sub: '治疗阶段记录 · 日期待核原件' }] : []),
    ];
    const calendarEvents = collectCalendarEvents(P());
    const confirmedCount = currentMarkers().filter((marker) => marker.status === 'confirmed' || confirmedMarkers().has(marker.id)).length;
    const statusLabel = line ? esc(line.phase) : '尚未记录治疗线';
    const nextAppointment = calendarEvents.find((event) => event.kind === '预约');
    return `${pageHead('病程资料，慢慢理清。','按治疗线、指标和重要事件整理。内容全部为合成演示，不包含真实患者信息。', '<button class="button primary" data-action="prompt" data-prompt="帮我把最近一份骨髓瘤检查报告整理成待核对记录。保留原文、日期、单位和来源，不要判断病情。">整理一份报告</button>')}
      <section class="status-capsules" aria-label="病程状态摘要">
        <button class="status-capsule" data-view="treatment"><span>当前治疗线</span><b>${statusLabel}</b><small>${esc(line?.start || '日期待核对')} · 原文与来源待核</small></button>
        <button class="status-capsule" data-view="records"><span>档案核对</span><b>${confirmedCount} 项已确认</b><small>未确认候选不会参与试验线索对照</small></button>
        <button class="status-capsule" data-view="calendar"><span>已登记日历事项</span><b>${calendarEvents.length} 条</b><small>${nextAppointment ? `预约记录：${esc(nextAppointment.date)}` : '尚无已登记预约'}</small></button>
      </section>
      <section class="hero-card"><div class="eyebrow-line"><span class="flower">✿</span>MYELOMA · 长期病程记录</div><h2>复查、治疗与生活，<br>都留下一份可回看的记录。</h2><p>患者自己记，家人也可以代记。每条内容都会保留来源与记录者；确认前，它仍是一条候选。</p><div class="hero-meta">${tag(`${P().age} 岁`, 'plum')}${tag(P().role, 'plum')}${tag('本地演示档案', 'synth')}</div></section>
      <section class="primer-entry-card"><div class="primer-entry-copy"><span class="eyebrow-line"><span class="flower">✿</span>疾病概要 · 公共背景</span><h2>多发性骨髓瘤是什么？</h2><p>用四段了解疾病定义、医学资料与指南、治疗全景，以及本项目已记录的资料。内容是公开信息整理，不用于判断个人病情。</p><div class="primer-entry-sections"><span>定义</span><span>指南与资料</span><span>治疗全景</span><span>发展趋势</span></div></div><div class="primer-entry-actions"><button class="button orange" data-action="calendar-shortcut" aria-label="打开病程日历">打开病程日历 →</button><button class="button secondary" data-action="primer">疾病概要：多发性骨髓瘤是什么？</button></div></section>
      <div class="section-heading"><div><h2>最近的记录</h2><p>看时间、看来源；不把单个数值当作结论。</p></div><button class="button ghost small" data-view="metrics">看完整趋势 →</button></div>
      <div class="grid"><section class="card card-pad col-7">${cardHead('指标概览','报告日期与检测结果并列',tag('记录视图','plum'))}<div class="two-col">${metricPanel(m[0])}${metricPanel(m[1])}</div></section>
      <section class="card card-pad col-5">${cardHead('病程中的节点','治疗线和支持事件分开记录',tag('慢性循环',''))}<div class="timeline-mini">${next.map((x) => `<div class="timeline-row"><span class="timeline-date">${esc(x.date)}</span><span class="timeline-node">●</span><span class="timeline-copy"><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></span></div>`).join('')}</div><button class="button secondary small" data-view="treatment">打开治疗线</button></section></div>
      <div class="section-heading"><div><h2>从这里继续</h2><p>按眼前要做的事进入，完成后可回到看板。</p></div></div>
      <div class="task-grid">${[
        ['treatment','↻','治疗线时间轴','按日期查看阶段和原始记录'],['calendar','▦','病程日历','仅显示档案中已登记的日期'],['transplant','◉','移植旅程','采集、回输、植入与出院节点'],['bone','◇','骨事件与骨保护','事件、用药和牙科事实记录'],['infection','＋','感染与疫苗','感染、Ig 指标和既往接种记录'],['visit','▤','复诊准备','整理记录摘要与待问医生的问题'],['trials','⌕','临床试验线索','查看来源、快照和可追溯证据'], 
      ].map(([view, icon, title, desc]) => `<button class="task-card" data-view="${view}"><span class="task-icon">${icon}</span><b>${title}</b><small>${desc}</small></button>`).join('')}</div>
      <div class="section-heading"><div><h2>记录由谁提供</h2><p>自报和代报是两种视角，并列保留。</p></div></div>
      <section class="card card-pad"><div class="two-col"><div class="data-item"><small>记录主体</small><b>${esc(P().role)}</b><span>${esc(P().caregiver.author)} · ${esc(P().caregiver.basis)}</span></div><div class="data-item"><small>可见范围</small><b>${esc(P().caregiver.visibility)}</b><span>原型不模拟真实权限保存；未确认的私密内容不进入复诊摘要。</span></div></div></section>`;
  }
  function primerView(trigger = document.activeElement, fromDeepLink = false) {
    const sources = [
      { org: 'NCCN', doc: 'Guidelines for Patients: Multiple Myeloma', version: '在线文件版本未核实', url: 'https://www.nccn.org/patients/guidelines/content/PDF/myeloma-patient.pdf', link: '打开 NCCN 患者指南 PDF ↗', access: '官方 PDF 地址；当前未逐页核对 PDF 版本。', purpose: '患者版疾病与治疗信息入口；本页不引用未核实版本中的具体条文。' },
      { org: 'NCCN', doc: 'NCCN Clinical Practice Guidelines in Oncology: Multiple Myeloma', version: '在线索引可见 Version 2.2027；本台未核原文', url: 'https://www.nccn.org/guidelines/category_1', link: '打开 NCCN 指南目录 ↗', access: '官方目录可访问；专业指南正文可能需要登录。', purpose: '专业指南入口；需在引用前确认正文版本和更新日期。' },
      { org: 'IMWG', doc: 'Criteria for the Diagnosis of Multiple Myeloma', version: 'IMF 公共摘要；所引原始标准发表于 2014 年', url: 'https://www.myeloma.org/international-myeloma-working-group-imwg-criteria-diagnosis-multiple-myeloma', link: '打开 IMF 的 IMWG 标准摘要 ↗', access: '公开二次摘要，不等于原始指南全文；页面更新日期未见。', purpose: 'CRAB、SLiM 与相关浆细胞疾病诊断框架入口。' },
      { org: 'IMWG', doc: 'International Myeloma Working Group diagnostic criteria（Lancet Oncology）', version: '2014', url: 'https://doi.org/10.1016/S1470-2045(14)70442-5', link: '打开 2014 年论文 DOI ↗', access: '原始论文出版方入口；全文可能需要订阅或机构权限。', purpose: '用于追溯 2014 年诊断标准论文；不是当前版本状态的证明。' },
      { org: 'IMWG', doc: 'Consensus recommendations for risk stratification in multiple myeloma', version: '原始论文 2014；在线摘要页版本未标注', url: 'https://www.myeloma.org/imwg/imwg-consensus-risk-stratification-multiple-myeloma', link: '打开 IMF 的风险分层摘要 ↗', access: '公开二次摘要；原始论文为 Leukemia 2014。', purpose: '用于理解风险分层资料来源；不据此推导个人风险。' },
      { org: 'CSCO', doc: 'CSCO 指南订购 / 2025 指南汇编信息', version: '订购信息页面发布于 2026-05-06', url: 'https://www.csco.org.cn/cn/ncontent.aspx?oid=9038', link: '打开 CSCO 指南汇编信息 ↗', access: '官方汇编与获取信息；未提供本页所列骨髓瘤指南全文。', purpose: '仅作为指南获取入口，不引用未取得原件的具体条文。' },
      { org: 'CSCO', doc: 'CSCO 骨髓瘤指南更新解读（会议回放）', version: '2025 会议回放', url: 'https://reg2023.csco.org.cn/wap/resource/36?type=2', link: '打开 CSCO 骨髓瘤指南更新解读回放 ↗', access: '官方会议回放列表；解读视频不等于指南全文。', purpose: '说明存在更新解读入口，不作为指南原件。' },
      { org: 'WHO / IARC', doc: 'WHO Classification of Tumours Online: Haematolymphoid Tumours', version: 'WHO 第 5 版，Volume 11；2024', url: 'https://whobluebooks.iarc.who.int/structures/haematolymphoid/', link: '打开 WHO/IARC 在线分类 ↗', access: '可查看分类层级；完整出版内容通过图书或订阅服务获取。', purpose: '疾病分类入口，不是治疗指南。' },
      { org: 'WHO / IARC', doc: 'Haematolymphoid Tumours', version: '第 5 版，Volume 11；2024', url: 'https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024', link: '打开 WHO/IARC 出版信息 ↗', access: '官方出版物信息；完整内容需通过图书或在线服务访问。', purpose: '核对分类书目与版本信息。' },
      { org: 'NCI / SEER', doc: 'SEER Cancer Stat Facts: Myeloma', version: '诊断年龄统计期 2019–2023', url: 'https://seer.cancer.gov/statfacts/html/mulmy.html', link: '打开 SEER 人群统计 ↗', access: '公开美国人群统计；页面报告诊断中位年龄 69 岁。', purpose: '仅作为人群统计示例，不能外推到个人或中国患者。' },
      { org: 'NCI', doc: 'Myeloma Treatment (PDQ), Health Professional Version', version: '最近更新 2025-04-25', url: 'https://www.cancer.gov/types/myeloma/hp/myeloma-treatment-pdq', link: '打开 NCI PDQ 专业版 ↗', access: '公开专业信息摘要；美国语境，非本地指南替代品。', purpose: '补充疾病背景与治疗类别的二次资料；个别内容仍需以原指南核对。' },
    ];
    const sourceCards = sources.map((source) => `<article class="primer-source-card"><div class="primer-source-top"><span class="primer-org">${esc(source.org)}</span><span class="primer-source-status">${esc(source.version)}</span></div><h3>${esc(source.doc)}</h3><p>${esc(source.purpose)}</p><a class="primer-source-link" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.link)}</a><small>${esc(source.access)}</small></article>`).join('');
    const sectionSource = (label, detail) => `<p class="primer-source-note"><b>来源状态</b>${esc(label)} · ${esc(detail)}</p>`;
    const sections = [
      { id: 'primer-definition', nav: '定义' }, { id: 'primer-evidence', nav: '指南与资料' }, { id: 'primer-landscape', nav: '治疗全景' }, { id: 'primer-trend', nav: '发展趋势' },
    ];
    const html = `<div class="page-view-inner primer-page"><header class="primer-hero"><div class="eyebrow-line"><span class="flower">✿</span>MYELOPAL · 疾病公共背景</div><h1>多发性骨髓瘤是什么？</h1><p>这里整理疾病定义、医学资料来源、治疗类别与已经记录的公开事实，帮助读懂病程资料；不用于判断个人病情。</p><div class="primer-hero-meta"><span>最后更新：2026-10-26</span><span>四段内容 · 公开资料摘要</span><span>版本与原件状态逐项注明</span></div></header><nav class="primer-toc" aria-label="疾病概要章节">${sections.map((section) => `<button type="button" data-primer-section="${section.id}">${section.nav}</button>`).join('')}</nav>
      <div class="notice warning primer-boundary"><strong>这是疾病背景资料，不是个人诊断或治疗建议。</strong>指南版本、原件获取状态和统计口径都在本页标明；资料缺失时不做推断。</div>
      <section class="primer-section" id="primer-definition"><div class="primer-section-heading"><span class="primer-section-kicker">01 · DISEASE</span><h2>定义</h2><p>多发性骨髓瘤（MM）是以克隆性浆细胞增殖为特征的浆细胞肿瘤。</p></div><div class="primer-section-body"><p>浆细胞属于免疫系统中的 B 细胞谱系，主要位于骨髓。异常浆细胞增殖并产生单克隆免疫球蛋白或其片段（M 蛋白）；疾病可涉及一个或多个骨髓部位，也可能出现溶骨性病灶。多发性骨髓瘤属于浆细胞疾病谱，常需与意义未明的单克隆丙种球蛋白病（MGUS）、冒烟型骨髓瘤（SMM）及浆细胞瘤等分类区分。分类与诊断需依据完整检查和临床团队记录，本台不自行判断。</p><div class="primer-fact-grid"><article><b>疾病分类</b><p>WHO 第 5 版造血与淋巴组织肿瘤分类将浆细胞骨髓瘤列于淋巴浆细胞及浆细胞肿瘤相关层级。完整分类原文未纳入本项目。</p></article><article><b>常见分泌类型</b><p>可见 IgG、IgA 等重链类型，也有轻链型。轻链型的记录可能需要单独查看血清游离轻链（FLC）；不能只凭单一检测推断病情。</p></article><article><b>诊断相关框架</b><p>CRAB 涵盖高钙血症、肾功能损害、贫血和骨病变；SLiM 还涉及骨髓克隆性浆细胞比例、游离轻链比值和 MRI 病灶等定义事件。</p></article><article><b>分期与细胞遗传</b><p>ISS / R-ISS 分期与细胞遗传学结果相关但不是可互换字段。del(17p)、t(4;14) 等信息不由本台自动换算成个人风险结论。</p></article></div><div class="primer-demography"><b>人群统计例子</b><span>美国 SEER 2019–2023 数据报告诊断中位年龄为 69 岁；这是美国人群层面的统计，不代表其他地区分布或个人情况。</span><a href="https://seer.cancer.gov/statfacts/html/mulmy.html" target="_blank" rel="noopener noreferrer">查看 SEER 统计口径 ↗</a></div></div>${sectionSource('部分二次来源已链接；分类原件未取得，版本与页码仍需逐条核实。','来源包括 WHO/IARC 分类入口、IMF 托管的 IMWG 诊断标准摘要、NCI PDQ 与 SEER 人群统计。')}</section>
      <section class="primer-section" id="primer-evidence"><div class="primer-section-heading"><span class="primer-section-kicker">02 · SOURCES</span><h2>医学资料规范和指南情况</h2><p>指南、共识、分类和患者信息来源分开标记。点击链接可打开来源页面；链接可访问不代表本项目已取得或审阅其全文。</p></div><div class="primer-source-grid">${sourceCards}</div><div class="notice soft primer-note">未取得指南原件的项目，只记文件入口与用途，不引用具体条文、推荐等级或剂量。NCCN 专业版可能需要登录；CSCO 页面是获取/会议解读入口；WHO/IARC 在线分类可见分类层级，完整出版内容受访问方式限制。</div>${sectionSource('入口已搜索并核对页面类型；NCCN PDF 的具体版次未能从 PDF 正文确认。','IMWG 页面有公开二次摘要与可追溯论文入口；CSCO 链接不是指南全文；WHO 第五版书目为 2024。')}</section>
      <section class="primer-section" id="primer-landscape"><div class="primer-section-heading"><span class="primer-section-kicker">03 · TREATMENT LANDSCAPE</span><h2>目前治疗全景概要</h2><p>以下按治疗阶段列出常见类别，帮助识别术语；不是方案比较、治疗顺序建议或适用性判断。</p></div><div class="primer-treatment-grid"><article><span>初治阶段</span><h3>诱导治疗</h3><p>方案可能涉及蛋白酶体抑制剂、免疫调节剂、抗 CD38 单抗及糖皮质激素等药物类别，组合因指南版本和临床背景而异。</p></article><article><span>部分患者的治疗环节</span><h3>自体造血干细胞移植</h3><p>围绕干细胞动员、采集、预处理、回输及恢复随访等环节。本工作台仅记录日期和原始资料，不评估是否适合移植。</p></article><article><span>治疗后阶段</span><h3>巩固与维持</h3><p>可包含巩固治疗及维持治疗类别；方案与持续时间以医生记录和当前指南原文为准。</p></article><article><span>疾病复发或难治阶段</span><h3>后线治疗与研究</h3><p>可见不同药物类别、细胞治疗及临床研究等信息。批准状态、适应症和地区可及性须另查现行官方资料。</p></article><article><span>全程支持</span><h3>骨骼、感染与器官支持</h3><p>包括骨健康、感染预防和疫苗记录、肾功能与贫血等支持管理类别；本台不生成个体处置建议。</p></article><article><span>贯穿全程</span><h3>复查与病程记录</h3><p>M 蛋白、游离轻链、血常规、血钙、肌酐和影像等检查依临床安排。记录页保留日期、单位、来源与方法，不自动判断进展。</p></article></div><p class="primer-fixed-exit">以上是文献与指南里列出的手段，按病期与线序排列，<strong>不代表任何一项适合你</strong>。选哪一个，这一句需要问你的医生。</p>${sectionSource('治疗类别摘要，原件未取得。','NCCN 官方患者指南入口、NCI PDQ 二次资料与 CSCO 汇编信息页；未引用剂量、比较结果或个体选择条件。')}</section>
      <section class="primer-section" id="primer-trend"><div class="primer-section-heading"><span class="primer-section-kicker">04 · DATED FACTS</span><h2>发展趋势</h2><p>此处只列带日期和来源的已记录事实；没有整理的事项明确留空。</p></div><div class="primer-snapshot-card"><span class="primer-snapshot-date">快照日期 · 2026-10-25</span><b>257 条</b><strong>指定检索式命中的登记记录</strong><p>来自单一平台与六个中英文检索词：多发性骨髓瘤、骨髓瘤、浆细胞瘤、multiple myeloma、myeloma、plasma cell myeloma。不是全量统计；临床试验阶段分布未统计；登记状态未核实；快照不含足以做条件对照的纳入/排除条件。</p><small>来源：本项目 research/myeloma-cancer/manifest.json，采集工具 unified_search_trials。</small></div><div class="primer-uncollected"><b>本台尚未整理</b><span>指南版本的逐次更替、监管批件变化、分类体系后续更新和试验阶段分布，目前没有完成可追溯的逐项核验。</span></div>${sectionSource('登记快照为本项目一手采集记录；指南与批件趋势未整理。','登记状态未核实，不代表当前招募状态、研究质量或可入组性。')}</section>
      <footer class="primer-footer">最后更新 2026-10-26 · 内容仅整理公共背景和已注明来源的事实 · 与个人有关的诊断或治疗判断，请咨询血液科团队。</footer></div>`;
    openPage('病情介绍', '看板 › 病情概要', html, trigger, 'primer', fromDeepLink);
  }
  function metricsView() {
    return `${pageHead('指标趋势','只并列记录与来源；方法或单位变化时需分开比较。','<button class="button secondary" data-action="prompt" data-prompt="帮我按日期整理 M 蛋白和游离轻链记录，并指出哪些项目缺少单位或检测来源。不要判断进展。">示例：整理指标记录</button>')}
      <div class="notice soft"><strong>M 蛋白 ≠ 复发。</strong>本页只呈现记录的数值、日期与来源。检测方法、单位或实验室变化时需先核对，不能只凭一项结果判断病情。</div>
      <div class="section-heading"><div><h2>六个月记录窗口</h2><p>合成演示数据；曲线只是记录排列，不代表疾病结论。</p></div></div><div class="two-col">${P().metrics.map(metricPanel).join('')}</div>
      <div class="section-heading"><div><h2>补充记录</h2><p>血钙、肌酐和血红蛋白需要从原报告逐项录入。</p></div></div><div class="empty-state"><b>目前没有已确认的钙/肌酐/血红蛋白记录</b>没有的数据保持空白，不用 0 代替。<br><button class="button secondary small" data-action="toast" data-message="原型演示：手工补录入口待确认。">⋯ 更多 · 手工补一条</button></div>`;
  }
  function phaseCard(line) {
    const sections = [['方案', line.regimen], ['指标和趋势', line.metrics], ['影像发现', line.imaging], ['副作用总结', line.ae], ['心理/营养措施和效果', line.support]];
    return `<details class="phase-fold"><summary><span class="phase-summary"><strong>${esc(line.phase)} · ${esc(line.start)}—${esc(line.end)}</strong><small>${esc(line.summary)}</small></span><span class="phase-end">展开细节</span><span class="phase-caret" aria-hidden="true">⌄</span></summary><div class="phase-detail">${sections.map(([title, items]) => `<section class="pd-block"><h3>${title}</h3>${(items?.length ? items : ['无此阶段记录；说明：尚未录入。']).map((item) => `<p>${esc(item)}</p>`).join('')}</section>`).join('')}</div></details>`;
  }
  function treatmentView() {
    const lines = [...P().lines].sort((a, b) => a.start.localeCompare(b.start));
    return `${pageHead('治疗线时间轴','按治疗阶段日期回顾原始记录；日期范围和方案均待以原件核对。','<button class="button secondary" data-action="prompt" data-prompt="请帮我把这条治疗记录整理为待核对候选：方案原文、日期、计划/实际、换线原因原文。不要评价疗效。">示例：整理治疗记录</button>')}
      <div class="notice soft">阶段条带按档案中已有起止日期绘制；周期描述不会被扩展为每日给药安排。每条阶段保留项目规定的五块折叠详情。</div>
      <div class="section-heading"><div><h2>治疗阶段</h2><p>${lines.length} 条演示记录 · 按记录日期排列</p></div><button class="button secondary small" data-action="maintenance-open" data-mode="manual">⋯ 更多 · 手工补一条</button></div>
      <div class="treatment-timeline">${lines.map((line) => `<section class="timeline-phase"><div class="timeline-rail"><span></span></div><div class="timeline-phase-content"><div class="timeline-phase-date"><time>${esc(line.start)}</time><span>—</span><time>${esc(line.end)}</time></div><div class="timeline-phase-bar"><b>${esc(line.phase)}</b><span>${esc(line.summary)}</span></div>${phaseCard(line)}</div></section>`).join('')}</div>
      <div class="section-heading"><div><h2>计划与实际记录</h2><p>只对照档案已有信息，不自动补齐缺失周期。</p></div></div><section class="card card-pad"><table class="plan-table"><thead><tr><th>阶段</th><th>计划记录</th><th>实际记录</th><th>来源状态</th></tr></thead><tbody>${lines.map((line) => `<tr><td>${esc(line.phase)}</td><td>按医生记录核对</td><td>${esc(line.start)}—${esc(line.end)}</td><td>${tag('演示记录','synth')}</td></tr>`).join('')}</tbody></table></section>`;
  }
  function eventsView(kind) {
    const title = kind === 'transplant' ? '移植档案' : kind === 'bone' ? '骨事件与骨保护' : kind === 'infection' ? '感染与疫苗' : '照护与生活支持';
    const subtitle = kind === 'transplant' ? '按资料日期回顾移植阶段；不评价移植效果。' : kind === 'bone' ? '记录事件和牙科事实，不推断病因或骨折风险。' : kind === 'infection' ? '保留感染和接种原始记录，不替代医生决定。' : '患者自报与照护者观察各自记录。';
    let rows = [];
    if (kind === 'transplant') rows = P().transplant.map((x) => ({ date: x.date, title: x.name, detail: x.source }));
    if (kind === 'bone') rows = P().boneEvents.map((x) => ({ date: x.date, title: x.name, detail: x.note }));
    if (kind === 'infection') rows = [...P().infections, ...P().vaccines].map((x) => ({ date: x.date, title: x.name, detail: x.note }));
    if (kind === 'support') rows = [{ date: '2026-10-12', title: P().caregiver.author, detail: `${P().caregiver.basis}；${P().caregiver.visibility}` }];
    return `${pageHead(title, subtitle, `<button class="button secondary" data-action="prompt" data-prompt="帮我整理这份${title}资料为待核对候选，保留原话、来源日期与记录者，不要推断原因或给建议。">示例：整理本页资料</button>`)}<section class="card card-pad">${cardHead('已有记录','合成演示资料',tag(`${rows.length} 条`,'plum'))}${rows.length ? `<div class="timeline-mini">${rows.map((x) => `<div class="timeline-row"><span class="timeline-date">${esc(x.date)}</span><span class="timeline-node">●</span><span class="timeline-copy"><b>${esc(x.title)}</b><small>${esc(x.detail)}</small></span></div>`).join('')}</div>` : '<div class="empty-state"><b>还没有这类记录</b>空白表示暂无录入，不代表没有发生。</div>'}<div style="margin-top:12px"><button class="button secondary small" data-action="toast" data-message="原型演示：手工补录入口待确认。">⋯ 更多 · 手工补一条</button></div></section>`;
  }
  function visitView() {
    const recent = P().metrics.map((metric) => { const last = latestMetric(metric); return `<div class="data-item"><small>${esc(metric.label)}</small><b>${last ? `${esc(last.v)} ${esc(metric.unit)}` : '未记录'}</b><span>${last ? esc(last.d) : '暂无确认记录'}</span></div>`; }).join('');
    return `${pageHead('复诊准备','先选想带去的问题和记录，再预览摘要。私密内容不会自动加入。','<button class="button primary" data-action="toast" data-message="已生成一份本机演示预览；并未创建真实文件。">生成摘要预览</button>')}<div class="notice">这里展示的是患者选择的记录和问题，不提供诊断总结。任何导出在真实版本中都需先预览并确认。</div><div class="section-heading"><div><h2>可带去核对的记录</h2><p>当前档案中的最近记录</p></div></div><section class="card card-pad"><div class="two-col">${recent}</div></section><div class="section-heading"><div><h2>想问医生的问题</h2><p>原型示例，可修改或取消。</p></div></div><section class="card card-pad"><ul><li>这几次 M 蛋白的检测方法和单位是否相同？</li><li>移植后维持阶段的复查安排以哪份记录为准？</li><li>哪些登记信息需要研究中心进一步核对？</li></ul><button class="button secondary small" data-action="toast" data-message="问题清单仅保存在本次原型内存中。">调整问题清单</button></section>`;
  }
  function maintenancePanel() {
    if (!state.maintenanceMode) return '';
    const ai = state.maintenanceMode === 'ai';
    const candidate = state.candidateSeq ? `<section class="candidate-review" aria-live="polite"><h3>待核对候选 · ${esc(state.candidateLabel || '报告摘要')}</h3><p>候选来源：${esc(state.candidateSource || '本机演示输入')} · 日期：${esc(state.candidateDate || '待补充')}</p><div class="two-col"><label>字段名称<input class="field-input" id="candidate-label" value="${esc(state.candidateLabel || '')}"></label><label>抄录内容<input class="field-input" id="candidate-value" value="${esc(state.candidateValue || '')}"></label><label>来源名称<input class="field-input" id="candidate-source" value="${esc(state.candidateSource || '')}"></label><label>报告日期<input class="field-input" id="candidate-date" type="date" value="${esc(state.candidateDate || '')}"></label></div><p class="small-note">AI 仅生成演示候选，必须逐项确认；拒收不会改变档案。</p><button class="button primary small" data-action="candidate-accept">确认加入演示档案</button><button class="button secondary small" data-action="candidate-reject">拒收候选</button></section>` : '';
    const form = ai ? `<label>报告原文或你的描述<textarea class="field-input" id="maintenance-text" rows="3" placeholder="粘贴/描述需要整理的记录">${esc(state.maintenanceText)}</textarea></label><button class="button primary small" data-action="candidate-generate">生成待核对候选</button><p class="small-note">演示流程：不会上传内容，也没有调用真实 AI 服务。</p>` : `<form class="manual-form" id="manual-form"><label>记录类别<select class="field-input" name="kind"><option>病理/细胞遗传/IHC</option><option>治疗记录</option><option>检查记录</option><option>其他病程资料</option></select></label><label>字段名称<input class="field-input" name="label" required maxlength="40" placeholder="例如：报告项目"></label><label>记录内容<input class="field-input" name="value" required maxlength="120" placeholder="照抄报告或记录原文"></label><label>来源名称<input class="field-input" name="source" required maxlength="80" placeholder="报告或病历名称"></label><label>来源日期<input class="field-input" name="date" type="date" required></label><label>记录者<select class="field-input" name="author"><option>${esc(P().role)}</option><option>照护者代记</option></select></label><p class="small-note">最多 6 项；保存到本次原型的演示档案内存，刷新后清除。临床试验线索只读取已确认、带来源和日期的病理/细胞遗传/IHC字段。</p><button class="button primary small" type="submit">保存为待核对</button><button class="button secondary small" type="button" data-action="maintenance-close">取消</button></form>`;
    return `<section class="card card-pad maintenance-panel"><div class="card-head"><div><h2>${ai ? 'AI 辅助整理' : '手工补充资料'}</h2><p>${ai ? '先形成可编辑候选，确认后才更新演示档案。' : '按原文抄录来源与日期，不做医学解释。'}</p></div><button class="button ghost small" data-action="maintenance-close">收起</button></div>${form}${candidate}</section>`;
  }
  function recordsView() {
    return `${pageHead('资料核对','只有逐项核对并确认入库的字段，才会出现在临床线索档案中。','<button class="button secondary" data-action="maintenance-open" data-mode="ai">AI 辅助整理</button>')}<div class="notice warning"><strong>确认状态会影响临床线索。</strong>候选字段未确认之前，不参与结构化匹配；拒收候选不改变现有档案。手工保存与 AI 候选均为本机演示状态。</div>
      <section class="maintenance-actions"><button class="button primary" data-action="maintenance-open" data-mode="ai">AI 辅助整理</button><button class="button secondary" data-action="maintenance-open" data-mode="manual">手工补一条</button><span>AI 与手工共用逐项核对；最多 6 个手工字段。</span></section>${maintenancePanel()}
      <div class="section-heading"><div><h2>基因 / 病理 / IHC 字段</h2><p>字段必须附原报告和日期</p></div></div><div class="pathway-list">${currentMarkers().map((marker) => `<section class="card card-pad"><div class="trial-card-head"><div><div class="trial-meta">${tag(marker.type === 'gene' ? '基因/细胞遗传' : marker.type === 'ihc' ? 'IHC' : '病理', 'plum')}${tag(marker.status === 'confirmed' || confirmedMarkers().has(marker.id) ? '已确认入库' : marker.status === 'candidate' ? '待核对候选' : '未记录', marker.status === 'confirmed' || confirmedMarkers().has(marker.id) ? 'ok' : marker.status === 'candidate' ? 'warn' : '')}</div><h3 style="margin-top:8px">${esc(marker.label)} · ${esc(marker.value)}</h3><p>${esc(marker.source)}${marker.date ? ` · ${esc(marker.date)}` : ''}${marker.author ? ` · 记录者 ${esc(marker.author)}` : ''}</p></div>${marker.status === 'candidate' && !confirmedMarkers().has(marker.id) ? `<button class="button secondary small" data-action="confirm-marker" data-id="${esc(marker.id)}">逐项核对</button>` : ''}</div></section>`).join('')}</div><section id="new-markers"></section>`;
  }
  function trialSubTabs() {
    return `<div class="tabs" role="tablist" aria-label="临床试验功能">${[['profile','建档'],['search','检索'],['results','匹配结果']].map(([id, label]) => `<button class="tab-button" role="tab" id="tab-${id}" aria-selected="${state.trialTab === id}" aria-controls="trial-panel" data-trial-tab="${id}">${label}</button>`).join('')}</div>`;
  }
  function evaluateSyntheticTrial(trial) {
    const conditions = (trial.conditions || []).map((condition) => {
      const marker = condition.markerId ? currentMarkers().find((item) => item.id === condition.markerId) : null;
      const confirmed = marker && (marker.status === 'confirmed' || confirmedMarkers().has(marker.id)) && Boolean(marker.date && marker.source);
      if (confirmed && ['gene', 'ihc', 'pathology'].includes(marker.type)) return { condition, state: marker.value.includes(condition.expected || '') ? 'met' : 'unmet', actual: marker.value, source: marker.source, date: marker.date };
      return { condition, state: 'unknown', actual: condition.reason || `档案没有已确认的${condition.category || condition.field}字段`, source: '', date: '' };
    });
    const met = conditions.filter((item) => item.state === 'met').length;
    const unmet = conditions.filter((item) => item.state === 'unmet').length;
    const unknown = conditions.filter((item) => item.state === 'unknown').length;
    const pct = Math.round((met / Math.max(1, conditions.length)) * 100);
    const hardUnmet = conditions.filter((item) => item.state === 'unmet' && item.condition.hard);
    const band = hardUnmet.length ? 'hard_failure' : pct >= 80 && unknown <= 1 ? 'high' : pct >= 55 ? 'partial' : 'needs_info';
    return { conditions, met, unmet, unknown, pct, band, hardUnmet };
  }
  function bandForExample(result) {
    const bands = { high: ['高度符合', 'ok'], partial: ['部分符合', 'warn'], needs_info: ['需补充信息', 'grey'], hard_failure: ['硬性条件不满足', 'no'] };
    return bands[result.band];
  }
  function markerFact(marker) {
    const isConfirmed = marker.status === 'confirmed' || confirmedMarkers().has(marker.id);
    return `<div class="data-item"><small>${esc(marker.label)} ${isConfirmed ? '· 已确认入库' : '· 未参与匹配'}</small><b>${esc(marker.value)}</b><span>${esc(marker.source)}${marker.date ? ` · ${esc(marker.date)}` : ''}</span></div>`;
  }
  function renderSourceStatuses() {
    const sourceGroups = new Map();
    for (const row of APP.data.snapshot.sourceStates) {
      if (!sourceGroups.has(row.source_id)) {
        sourceGroups.set(row.source_id, {
          sourceId: row.source_id,
          statuses: new Map(),
        });
      }
      const source = sourceGroups.get(row.source_id);
      const statusKey = JSON.stringify([row.state, row.reason_code]);
      if (!source.statuses.has(statusKey)) source.statuses.set(statusKey, { count: 0, warnings: new Set() });
      const status = source.statuses.get(statusKey);
      status.count += Number(row.statusRowCount || 0);
      for (const warning of row.warnings || []) status.warnings.add(warning);
    }
    const coverage = APP.data.snapshot.coverageSummary || { queried: [], unavailable: [], notQueried: [] };
    const coverageSummary = `<div class="source-coverage"><b>采集记录中的覆盖范围</b><small>${coverage.queried?.length ? `曾查询：${esc(coverage.queried.join('、'))}。` : '没有记录到成功查询来源。'}${coverage.unavailable?.length ? ` 未覆盖：${esc(coverage.unavailable.join('、'))}。` : ''}${coverage.notQueried?.length ? ` 未发起：${esc(coverage.notQueried.join('、'))}。` : ''}</small></div>`;
    const cards = [...sourceGroups.values()].map((source) => {
      const statuses = [...source.statuses].map(([key, status]) => {
        const [name, reason] = JSON.parse(key);
        const warnings = [...status.warnings];
        const coverage = APP.data.snapshot.coverageSummary || { queried: [], unavailable: [] };
        const coveredSource = coverage.queried?.includes(source.sourceId);
        const unavailableSource = coverage.unavailable?.includes(source.sourceId);
        const description = name === 'FAILED'
          ? '历史采集失败；不计成功覆盖。'
          : name === 'DENIED'
            ? '历史访问被拒绝；不计查过或成功覆盖。'
            : name === 'NEEDS_SETUP'
              ? '采集时未配置；不计查过。'
              : name === 'NO_RESULTS'
                ? '有限查询无结果；不表示没有相关研究。'
                : name === 'SUCCESS'
                  ? '历史查询成功；不代表当前实时可用。'
                  : '历史终态；不代表当前在线查询。';
        const cls = name === 'FAILED' || name === 'DENIED' ? 'failed' : name === 'SUCCESS' ? 'success' : name === 'NEEDS_SETUP' ? 'setup' : '';
        const marker = name === 'FAILED' || name === 'DENIED' ? '!' : name === 'SUCCESS' ? '✓' : name === 'NEEDS_SETUP' ? '…' : '○';
        const qualifiesCoverage = ['SUCCESS', 'NO_RESULTS'].includes(name) && coveredSource && !unavailableSource;
        const sourceSummary = `${esc(name)}${reason ? ` · ${esc(reason)}` : ''} · ${status.count} 条状态记录`;
        const limited = warnings.length > 0;
        const coverageLabel = qualifiesCoverage ? '曾查询来源（离线记录）' : '不计成功覆盖';
        return `<div class="source-state-row"><span class="status-symbol ${cls}">${marker}</span><span><b>${sourceSummary}</b><small>${description}</small><small>${coverageLabel}${limited ? ' · 有完整性限制' : ''}</small>${limited ? `<small>该状态对应限制：${esc(warnings.join('；'))}</small>` : ''}</span></div>`;
      }).join('');
      return `<div class="status-card"><span class="status-copy"><b>${esc(source.sourceId)}</b><span class="source-state-list">${statuses}</span></span></div>`;
    }).join('');
    return `${coverageSummary}${cards}`;
  }
  function resolvedCriteria(trial) {
    const tierOrder = { '结构化命中': 0, '文本命中': 1, '无法自动匹配': 2, '宽口径命中': 3 };
    return trial.criteria.map((criterion) => {
      if (criterion.type !== '结构化命中') return criterion;
      const marker = currentMarkers().find((item) => item.id === criterion.markerId);
      const confirmed = marker && (marker.status === 'confirmed' || confirmedMarkers().has(marker.id)) && Boolean(marker.date && marker.source);
      const matched = confirmed && marker.value.includes(criterion.expected);
      if (matched) return { ...criterion, value: `${marker.value}（已确认入库）`, evidenceDate: marker.date, evidenceSource: marker.source };
      return {
        ...criterion,
        type: '无法自动匹配',
        reason: confirmed ? '已确认档案值与该合成条件示例不同；需人工查看条件原文。' : `档案中没有已确认的${criterion.field}字段；待核对候选不参与匹配。`,
      };
    }).sort((a, b) => (tierOrder[a.type] ?? 9) - (tierOrder[b.type] ?? 9));
  }
  function evidenceFor(trial) {
    return resolvedCriteria(trial).map((c) => `<article class="evidence-row"><b>${esc(c.type)} · ${esc(c.field)}</b><p>${esc(c.text)}</p><small>${esc(c.reason || c.value)}${c.type === '结构化命中' ? ` · 档案字段：${esc(c.value)} · ${esc(c.evidenceSource || '合成演示档案')} · ${esc(c.evidenceDate || '来源日期待核')}` : ''}</small></article>`).join('');
  }
  function syntheticTrialCard(trial) {
    const saved = state.saved.includes(trial.id);
    const result = evaluateSyntheticTrial(trial);
    const [bandLabel, bandClass] = bandForExample(result);
    const tiers = trial.kind === '宽口径线索' ? tag('宽口径线索 · 放在结果末尾','warn') : tag(trial.kind,'plum');
    const sorted = [...result.conditions].sort((a, b) => ({ unmet: 0, unknown: 1, met: 2 }[a.state] - { unmet: 0, unknown: 1, met: 2 }[b.state]));
    const conditionRow = ({ condition: c, state: status, actual, source, date }) => `<article class="evidence-row"><b>${esc(c.kind || '入组条件')} · ${esc(c.category || c.field)}${c.hard ? ' · 硬性条件' : ''}</b><p>${esc(c.text)}</p><small><strong>${status === 'met' ? '符合' : status === 'unmet' ? '不符合' : '待确认'}</strong> · 记录里是：${esc(actual)}${source ? ` · 来源 ${esc(source)} · ${esc(date)}` : ''} · 条件要求：${esc(c.expected || c.value || '见合成条件示例')}</small></article>`;
    const evidence = evidenceFor(trial);
    const evidenceMarkup = evidence || `<p class="small-note">当前没有可展示的文本/宽口径命中证据；仅显示逐条合成条件对照。</p>`;
    return `<article class="trial-card"><div class="trial-card-head"><div><div class="trial-meta">${tag('合成演示，不是真实登记记录','synth')}${tiers}<span class="tag no">登记状态，未核实</span></div><h3 style="margin-top:8px">${esc(trial.title)}</h3><p>${esc(trial.id)} · snapshotDate ${APP.data.snapshot.snapshotDate} · 不作资格判断</p></div><div class="fit ${bandClass}"><b>${result.pct}<small>%</small></b><span>粗筛符合度</span><em>${bandLabel}</em></div></div><p class="small-note">粗筛符合度 = 符合条件数 ÷ 全部已对照条件数；待确认项不计入符合项、仍计入分母。该比例是展示层派生值，不是资格判定或疗效预期。</p><div class="match-counts">${tag(`符合 ${result.met}`, 'ok')}${result.unmet ? tag(`不符合 ${result.unmet}`, 'no') : ''}${result.unknown ? tag(`待确认 ${result.unknown}`, 'warn') : ''}${result.hardUnmet.length ? tag(`硬性条件不满足 ${result.hardUnmet.length} 项，单列`, 'no') : ''}</div><div class="evidence-list">${sorted.map(conditionRow).join('')}</div><details class="evidence-expansion"><summary>证据层 · 结构化命中 / 文本命中 / 宽口径命中</summary><div class="evidence-list">${evidenceMarkup}</div></details><div class="trial-meta" style="margin-top:11px"><button class="button ${saved ? 'secondary' : 'primary'} small" data-action="save-trial" data-id="${esc(trial.id)}">${saved ? '已收藏线索' : '收藏线索'}</button><button class="button ghost small" data-action="add-question" data-id="${esc(trial.id)}">加入待问问题</button><span class="tag">只作为待核线索</span></div></article>`;
  }
  function trialSearchView() {
    const q = state.query.trim().toLowerCase();
    const list = APP.data.snapshot.trials.filter((trial) => (!q || `${trial.title} ${trial.id} ${trial.sourceId}`.toLowerCase().includes(q)) && (state.trialSource === 'all' || trial.sourceId === state.trialSource));
    const sources = [...new Set(APP.data.snapshot.trials.map((trial) => trial.sourceId))].sort();
    return `<div class="notice warning"><strong>检索范围：本机静态快照</strong>；本原型没有实时连接在线试验来源。在线通道的历史 statuses 在“匹配结果”中按来源列出，不能表示当前状态。</div><section class="card card-pad">${cardHead('检索本地快照','按标题、登记号和来源筛选；快照缺少条件文本，不产生真实匹配比例。',tag(`snapshotDate ${APP.data.snapshot.snapshotDate}`,'plum'))}<div class="filter-row"><label class="sr-only" for="trialQuery">搜索本地临床试验快照</label><input id="trialQuery" type="search" value="${esc(state.query)}" placeholder="搜索多发性骨髓瘤、BCMA 或登记号"><label>来源<select id="trialSource" class="field-input">${[['all','全部来源'],...sources.map((source) => [source,source])].map(([value,label]) => `<option value="${esc(value)}" ${state.trialSource === value ? 'selected' : ''}>${esc(label)}</option>`).join('')}</select></label><button class="button secondary small" data-action="clear-query">清空</button></div><p class="small-note" style="margin-top:10px">快照共 ${APP.data.snapshot.recordCount} 条；原型展示相关标题摘录。状态全部为“登记状态，未核实”，快照可能过期。</p></section><div class="section-heading"><div><h2>本地结果（${list.length}）</h2><p>标题或登记号命中只是一条检索线索。</p></div></div>${list.length ? list.map((trial) => `<article class="trial-card"><div class="trial-card-head"><div><div class="trial-meta">${tag(trial.sourceId,'plum')}${tag(`snapshotDate ${trial.snapshotDate}`)}<span class="tag no">登记状态，未核实</span></div><h3 style="margin-top:8px">${esc(trial.title)}</h3><p>${esc(trial.id)}${trial.registryNumbers.map((x) => ` · ${esc(x.registry)} ${esc(x.value)}`).join('')}</p></div><button class="button secondary small" data-action="snapshot-trial-detail" data-id="${esc(trial.id)}">查看来源</button></div><p>无法自动匹配：条件文本、招募状态、中心与充分详细记录不在此快照中，不能从标题推断。</p><div class="trial-meta">${trial.sourceUrl ? `<a class="button ghost small" href="${esc(trial.sourceUrl)}" target="_blank" rel="noreferrer">打开来源页面 ↗</a>` : ''}<button class="button secondary small" data-action="save-trial" data-id="${esc(trial.id)}">${state.saved.includes(trial.id) ? '已收藏线索' : '收藏线索'}</button></div></article>`).join('') : '<div class="empty-state"><b>当前词语未命中本地快照</b>这是有限快照检索结果，不表示没有相关研究。</div>'}`;
  }
  function openSnapshotTrialDetail(id, trigger, fromDeepLink = false) {
    const trial = APP.data.snapshot.trials.find((item) => item.id === id);
    if (!trial) return;
    const html = `<div class="page-view-inner"><div class="page-view-depth">${tag('真实本地快照摘录','plum')}${tag('登记状态，未核实','no')}${tag(`snapshotDate ${trial.snapshotDate}`)}</div><section class="card card-pad">${cardHead('登记标题',trial.title,tag(trial.sourceId,'plum'))}<div class="detail-source"><b>登记标识：</b>${esc(trial.id)}<br><b>来源：</b>${esc(trial.sourceId)}<br><b>抓取时间：</b>${esc(trial.retrievedAt || '未提供')}<br><b>状态说明：</b>${esc(trial.statusNote || '未提供')}<br><b>固定说明：</b>登记不等于有效、安全或可入组。</div><div class="section-heading"><div><h2>条件原文</h2><p>当前快照未保存可用条件字段。</p></div></div><div class="notice warning">无法自动匹配。原因：该记录快照不包含入组/排除条件文本，不能从标题推断条件。</div><div class="section-heading"><div><h2>来源入口</h2><p>打开来源并用登记标识定位记录，来源内容和当前状态由原网站核实。</p></div></div>${trial.sourceUrl ? `<a href="${esc(trial.sourceUrl)}" target="_blank" rel="noreferrer">打开来源页面 ↗</a>` : '<span>当前记录没有来源链接。</span>'}<p style="margin-top:12px"><button class="button secondary small" data-action="save-trial" data-id="${esc(trial.id)}">${state.saved.includes(trial.id) ? '已收藏线索' : '收藏线索'}</button><button class="button ghost small" data-action="add-question" data-id="${esc(trial.id)}">加入待问问题</button></p></section><div class="notice soft" style="margin-top:13px">这是 ${esc(trial.snapshotDate)} 的本地快照摘录，可能过期；登记状态未核实。详情缺失时不作匹配或资格判断。</div></div>`;
    openPage('条件原文与来源', state.pageStack.length ? `${state.pageStack.at(-1).crumb} › 线索详情` : '看板 › 临床试验 › 检索快照 › 线索详情', html, trigger, `trial-${id}`, fromDeepLink);
  }
  function savedView() {
    const entries = [...state.saved];
    const trials = entries.map((id) => APP.data.trials.find((x) => x.id === id) || APP.data.snapshot.trials.find((x) => x.id === id)).filter(Boolean);
    const savedSection = trials.length ? `<section class="card card-pad">${cardHead('已收藏的线索','收藏只用于回看；原型内存状态刷新后清除。',tag(`${trials.length} 条`,'plum'))}${trials.map((trial) => `<div class="saved-row"><div><b>${esc(trial.title)}</b><small>${esc(trial.id)} · 登记状态，未核实 · snapshotDate ${esc(trial.snapshotDate || APP.data.snapshot.snapshotDate)}</small></div><button class="button secondary small" data-action="${trial.synthetic ? 'trial-detail' : 'snapshot-trial-detail'}" data-id="${esc(trial.id)}">回看来源</button></div>`).join('')}</section>` : '<div class="empty-state"><b>还没有收藏的临床试验线索</b>在“检索”或本页合成示例中收藏后，可在这里回看。</div>';
    const questionSection = state.questions.length ? `<section class="card card-pad" style="margin-top:12px">${cardHead('待问医生的问题','仅为本次原型的临时清单；可逐条移除。',tag(`${state.questions.length} 条`,'plum'))}${state.questions.map((q) => `<div class="saved-row"><div><b>${esc(q.title)}</b><small>${esc(q.id)} · 来源待核对</small></div><button class="button ghost small" data-action="remove-question" data-id="${esc(q.id)}">移除</button></div>`).join('')}</section>` : '<section class="card card-pad" style="margin-top:12px"><h2>待问医生的问题</h2><p>从一条线索加入需核实的问题后，会出现在这里。</p></section>';
    return `${savedSection}${questionSection}`;
  }
  function trialProfileView() {
    const confirmed = currentMarkers().filter((marker) => marker.status === 'confirmed' || confirmedMarkers().has(marker.id));
    const pending = currentMarkers().filter((marker) => marker.status !== 'confirmed' && !confirmedMarkers().has(marker.id));
    return `<div class="notice warning"><b>建档字段需要逐项确认。</b>只有具有来源和日期的已确认病理、细胞遗传或 IHC 记录用于合成条件示例；未确认候选不会参与。这里没有真实在线查询。</div><section class="card card-pad">${cardHead('可用于条件对照的档案字段','当前选择的演示档案；来源、日期与核对状态并列显示。',tag(`${confirmed.length} 项已确认`,'plum'))}<div class="two-col">${confirmed.length ? confirmed.map(markerFact).join('') : '<div class="empty-state col-12"><b>暂无已确认档案字段</b>确认带来源日期的报告候选后再看对照示例。</div>'}</div>${pending.length ? `<div class="section-heading"><div><h3>待核对或缺少来源的字段</h3><p>这些字段不会参与对照</p></div></div><div class="two-col">${pending.map((marker) => `<div class="data-item"><small>${esc(marker.label)} · 未参与对照</small><b>${esc(marker.value)}</b><span>${esc(marker.source)}${marker.date ? ` · ${esc(marker.date)}` : ''}</span></div>`).join('')}</div>` : ''}<p class="small-note">患者偏好、所在城市与就诊便利度不进入符合度分子或分母。</p><p><button class="button secondary" data-view="records">管理病理 / 基因 / IHC 档案</button></p></section><section class="card card-pad">${cardHead('匹配结果说明','比例仅在合成条件示例中展示。',tag('展示层派生值','warn'))}<p>粗筛符合度 = 符合条件数 ÷ 全部已对照条件数。待确认项不计入符合项，但保留在分母；硬性条件不满足单独列出。四档标签为“高度符合、部分符合、需补充信息、硬性条件不满足”。这不是入组资格，也不代表疗效。</p></section>`;
  }
  function matchView() {
    const items = APP.data.trials;
    const normal = items.filter((trial) => trial.kind !== '宽口径线索');
    const broad = items.filter((trial) => trial.kind === '宽口径线索');
    return `<div class="notice warning"><strong>演示状态，未发起实时查询。</strong>在线来源终态来自 2026-10-25 快照历史记录，不代表当前在线状态；FAILED、DENIED、未配置或超时不算“查过”，也不计成功覆盖。真实快照不计算粗筛比例。</div>
      <div class="section-heading"><div><h2>双通道查询状态</h2><p>本地快照日期与在线来源历史状态分区展示。</p></div><button class="button secondary small" data-trial-tab="search">打开检索</button></div>
      <div class="two-col"><section class="card card-pad">${cardHead('本地研究快照','来自研究采集文件；可能过期。',tag(`snapshotDate ${APP.data.snapshot.snapshotDate}`,'plum'))}<div class="stat-row"><div class="stat"><span class="stat-label">快照记录</span><b class="stat-value">${APP.data.snapshot.recordCount}</b><small class="stat-note">全量记录数</small></div><div class="stat"><span class="stat-label">来源状态行</span><b class="stat-value">${APP.data.snapshot.sourceStatusRows}</b><small class="stat-note">跨关键词汇总</small></div><div class="stat"><span class="stat-label">页面摘录</span><b class="stat-value">${APP.data.snapshot.trials.length}</b><small class="stat-note">相关标题节选</small></div></div><p class="small-note">不含入组/排除条件和当前招募状态；标题命中不能作条件证据。</p></section><section class="card card-pad">${cardHead('在线来源状态','这些是采集时的历史终态；没有启动实时检索。',tag('非实时演示','warn'))}<div class="two-col">${renderSourceStatuses()}</div></section></div>
      <div class="section-heading"><div><h2>合成条件示例</h2><p>用于演示粗筛比例、四档标签和逐条证据；不是注册库原文或真实试验条件。</p></div></div>
      ${normal.map(syntheticTrialCard).join('')}
      <div class="section-heading"><div><h2>宽口径线索</h2><p>单独放在结果末尾；不与结构化和文本命中合并。</p></div></div>${broad.map(syntheticTrialCard).join('')}
      <div class="section-heading"><div><h2>收藏与待问问题</h2><p>只保存线索供回看；内存演示刷新后清除。</p></div></div>${savedView()}
      <div class="notice soft">硬性条件不满足时只作粗筛分组提示，不表示研究中心资格结论。未确认项计入比例分母，不计入符合项；用户偏好不计分。</div>`;
  }
  function trialsView() {
    const body = state.trialTab === 'profile' ? trialProfileView() : state.trialTab === 'search' ? trialSearchView() : matchView();
    const headingAction = state.trialTab === 'results' ? '<button class="button secondary" data-action="prompt" data-prompt="请只整理这条临床试验线索的来源、条件原文和待问医生的问题；不要推断资格，不要计算匹配分。">整理待问问题</button>' : '';
    return `${pageHead('临床试验线索','建档、检索、匹配结果；每条来源和限制都可回看。',headingAction)}
      <div class="notice soft"><strong>本地快照不是实时在线查询。</strong>真实快照只用于检索与来源展示；合成条件示例单独标记。登记状态未核实，登记不等于有效、安全或可入组。</div>${trialSubTabs()}<section id="trial-panel" role="tabpanel" aria-labelledby="tab-${state.trialTab}">${body}</section>`;
  }
  function render() {
    setHeader();
    const main = $('#main');
    const html = state.view === 'home' ? homeView()
      : state.view === 'metrics' ? metricsView()
      : state.view === 'calendar' ? calendarView()
      : state.view === 'treatment' ? treatmentView()
      : ['transplant','bone','infection','support'].includes(state.view) ? eventsView(state.view)
      : state.view === 'visit' ? visitView()
      : state.view === 'trials' ? trialsView()
      : recordsView();
    main.innerHTML = html;
    $$('.nav-item').forEach((b) => { const active = b.dataset.view === state.view; b.classList.toggle('is-active', active); if (active) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    if (state.view === 'trials') $$('.tab-button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.trialTab === state.trialTab)));
  }
  function notify(message) {
    const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible');
    clearTimeout(notify.timer); notify.timer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }
  function activateView(view) {
    if (!VIEWS[view]) return;
    state.view = view;
    if (view === 'trials') state.trialTab = state.trialTab || 'profile';
    if (view === 'records') state.maintenanceMode = '';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function openPage(title, crumb, html, trigger, key, fromDeepLink = false) {
    if (!state.pageStack.length) { state.pageScroll = window.scrollY; state.trigger = trigger || document.activeElement; }
    else state.pageStack[state.pageStack.length - 1].scroll = $('#pageViewBody').scrollTop;
    const page = { title, crumb, html, key: key || title, scroll: 0, trigger: trigger || document.activeElement };
    state.pageStack.push(page);
    if (!fromDeepLink) history.pushState({ myeloPage: state.pageStack.length, key: page.key }, '', `#page=${encodeURIComponent(page.key)}`);
    document.body.classList.add('page-view-open');
    paintPage(page);
  }
  function paintPage(page) {
    $('#pageViewTitle').textContent = page.title;
    $('#pageCrumb').textContent = page.crumb;
    $('#pageViewBody').innerHTML = page.html;
    $('#pageView').hidden = false;
    $('#pageViewBody').scrollTop = page.scroll || 0;
    $('#pageViewBody').focus({ preventScroll: true });
  }
  function syncPageDepth(depth) {
    while (state.pageStack.length > depth) state.pageStack.pop();
    const current = state.pageStack.at(-1);
    if (current) {
      paintPage(current);
      current.trigger?.focus?.({ preventScroll: true });
      return;
    }
    $('#pageView').hidden = true;
    document.body.classList.remove('page-view-open');
    window.scrollTo(0, state.pageScroll);
    state.trigger?.focus?.({ preventScroll: true });
  }
  function closePageView() {
    if (!state.pageStack.length) { $('#pageView').hidden = true; return; }
    const depth = state.pageStack.length;
    state.pageStack = [];
    syncPageDepth(0);
    if (history.state?.myeloPage) history.go(-depth);
  }
  function backPage() {
    if (!state.pageStack.length) return;
    if (!history.state?.myeloPage) { syncPageDepth(state.pageStack.length - 1); return; }
    const depth = state.pageStack.length;
    if (depth === 1) {
      syncPageDepth(0);
      history.back();
      return;
    }
    state.pageStack.pop();
    history.back();
  }
  function openTrialDetail(id, trigger, fromDeepLink = false) {
    const trial = APP.data.trials.find((x) => x.id === id) || APP.data.snapshot.trials.find((x) => x.id === id);
    if (!trial) return;
    const synth = Boolean(trial.synthetic);
    const critHtml = synth ? `<div class="evidence-list">${evidenceFor(trial)}</div>` : `<div class="notice warning">该快照记录不包含入组/排除条件，无法自动匹配。原因：来源数据未提供条件文本；请到来源记录查看并由研究中心核对。</div>`;
    const html = `<div class="page-view-inner"><div class="page-view-depth">${tag(synth ? '合成演示，不是真实登记记录' : '真实本地快照摘录', synth ? 'synth' : 'plum')}${tag('登记状态，未核实','no')}${tag(`snapshotDate ${trial.snapshotDate || APP.data.snapshot.snapshotDate}`)}</div><section class="card card-pad">${cardHead('登记标题',trial.title,tag(trial.sourceId || 'DEMO-MM','plum'))}<div class="detail-source"><b>登记标识：</b>${esc(trial.id)}<br><b>来源：</b>${esc(trial.sourceId || '合成演示')}<br><b>检索时间：</b>${esc(trial.retrievedAt || '合成示例，无真实登记来源')}<br><b>固定说明：</b>登记不等于有效、安全或可入组。</div><div class="section-heading"><div><h2>条件与匹配证据</h2><p>${synth ? '条件由合成数据构造，仅用于原型交互。' : '本快照没有条件字段，不从标题推断。'}</p></div></div>${critHtml}<div class="section-heading"><div><h2>来源原文入口</h2><p>如来源为通用检索页，应自行使用登记号定位记录。</p></div></div>${trial.sourceUrl ? `<a href="${esc(trial.sourceUrl)}" target="_blank" rel="noreferrer">打开来源页面 ↗</a>` : '<span>当前记录没有来源链接。</span>'}</section><div class="notice soft" style="margin-top:13px">不能根据此页评价资格、可入组状态或预期疗效。请将问题带给血液科医生或研究中心。</div></div>`;
    openPage('条件原文与来源', state.pageStack.length ? `${state.pageStack.at(-1).crumb} › 线索详情` : '看板 › 临床试验 › 线索详情', html, trigger, `trial-${id}`, fromDeepLink);
  }
  function actionHandler(event) {
    const el = event.target.closest('[data-view],[data-trial-tab],[data-action],[data-primer-section]');
    if (!el) return;
    if (el.dataset.view) { activateView(el.dataset.view); return; }
    if (el.dataset.trialTab) { state.trialTab = el.dataset.trialTab; render(); return; }
    const action = el.dataset.action;
    if (action === 'prompt') { state.maintenanceMode = 'ai'; state.view = 'records'; render(); notify('示例已打开资料核对演示流程；没有真实 AI 或发送操作。'); return; }
    if (action === 'primer') { primerView(el); return; }
    if (action === 'calendar-shortcut') { activateView('calendar'); return; }
    if (el.dataset.primerSection) { $('#pageViewBody').querySelector(`#${el.dataset.primerSection}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (action === 'maintenance-open') { state.maintenanceMode = el.dataset.mode || 'manual'; state.candidateSeq = 0; state.maintenanceText = ''; render(); return; }
    if (action === 'maintenance-close') { state.maintenanceMode = ''; state.candidateSeq = 0; render(); return; }
    if (action === 'calendar-day') { state.calendarDate = el.dataset.date; render(); return; }
    if (action === 'calendar-shift') { const [year, month] = state.calendarMonth.split('-').map(Number); const date = new Date(year, month - 1 + Number(el.dataset.delta), 1); state.calendarMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; state.calendarDate = ''; render(); return; }
    if (action === 'candidate-generate') {
      const raw = $('#maintenance-text')?.value.trim() || '';
      if (!raw) { notify('先输入要整理的原文或描述。'); return; }
      state.maintenanceText = raw;
      state.candidateLabel = '待确认记录'; state.candidateValue = raw.slice(0, 120); state.candidateSource = '本机演示输入'; state.candidateDate = '';
      state.candidateSeq += 1; render(); return;
    }
    if (action === 'candidate-reject') { state.candidateSeq = 0; state.maintenanceText = ''; state.candidateLabel = ''; state.candidateValue = ''; state.candidateSource = ''; state.candidateDate = ''; render(); notify('候选已拒收，档案没有变化。'); return; }
    if (action === 'candidate-accept') {
      const label = $('#candidate-label')?.value.trim(); const value = $('#candidate-value')?.value.trim(); const source = $('#candidate-source')?.value.trim(); const date = $('#candidate-date')?.value;
      if (!label || !value || !source || !date) { notify('请补齐字段名、原文、来源和报告日期后再确认。'); return; }
      if (manualMarkers().length >= 6) { notify('当前演示档案已达到 6 项上限。'); return; }
      manualMarkers().push({ id: `manual-${Date.now()}`, type: 'pathology', label, value, source, date, status: 'confirmed' }); state.candidateSeq = 0; state.maintenanceText = ''; state.maintenanceMode = ''; render(); notify('演示字段已确认；仅本次页面内存有效。'); return;
    }
    if (action === 'toast') { notify(el.dataset.message || '演示操作完成。'); return; }
    if (action === 'save-trial') {
      const id = el.dataset.id;
      if (state.saved.includes(id)) state.saved = state.saved.filter((x) => x !== id); else state.saved.push(id);
      notify(state.saved.includes(id) ? '已收藏本次演示线索（刷新后清除）。' : '已从本次演示收藏中移除。'); render(); return;
    }
    if (action === 'add-question') {
      const id = el.dataset.id;
      if (!state.questions.some((item) => item.id === id)) {
        const trial = APP.data.trials.find((item) => item.id === id) || APP.data.snapshot.trials.find((item) => item.id === id);
        state.questions.push({ id, title: trial?.title || id });
        notify('已加入本次演示的问题清单（刷新后清除）。');
      } else notify('这条线索已在待问问题清单中。');
      render(); return;
    }
    if (action === 'remove-question') { state.questions = state.questions.filter((item) => item.id !== el.dataset.id); render(); return; }
    if (action === 'trial-detail') { openTrialDetail(el.dataset.id, el); return; }
    if (action === 'snapshot-trial-detail') { openSnapshotTrialDetail(el.dataset.id, el); return; }
    if (action === 'clear-query') { state.query = ''; render(); return; }
    if (action === 'confirm-marker') {
      const marker = currentMarkers().find((x) => x.id === el.dataset.id);
      if (!marker) return;
      if (!marker.date || !marker.source) { notify('缺少报告来源或日期，当前不能确认入库。'); return; }
      if (confirm(`请确认演示字段与来源日期已核对：\n${marker.label}：${marker.value}\n来源：${marker.source}\n日期：${marker.date}\n\n这只会改变原型内存状态。`)) { marker.status = 'confirmed'; confirmedMarkers().add(marker.id); notify('该演示字段已标为确认，刷新后恢复。'); render(); }
      return;
    }
  }
  $('#primaryNav').addEventListener('click', actionHandler);
  $('#main').addEventListener('click', actionHandler);
  $('#pageViewBody').addEventListener('click', actionHandler);
  $('#main').addEventListener('input', (event) => { if (event.target.id === 'trialQuery') { state.query = event.target.value; const pos = event.target.selectionStart; render(); const input = $('#trialQuery'); input?.focus(); input?.setSelectionRange(pos, pos); } });
  $('#main').addEventListener('change', (event) => { if (event.target.id === 'trialSource') { state.trialSource = event.target.value; render(); } });
  $('#main').addEventListener('submit', (event) => {
    if (event.target.id !== 'manual-form') return;
    event.preventDefault();
    const form = new FormData(event.target);
    const label = String(form.get('label') || '').trim(); const value = String(form.get('value') || '').trim(); const source = String(form.get('source') || '').trim(); const date = String(form.get('date') || '');
    if (!label || !value || !source || !date) { notify('请填写字段名、记录内容、来源和日期。'); return; }
    if (manualMarkers().length >= 6) { notify('当前演示档案已达到 6 项上限。'); return; }
    const marker = { id: `manual-${Date.now()}`, type: markerTypeFor(String(form.get('kind') || '')), label, value, source, date, author: String(form.get('author') || P().role), status: 'candidate' };
    manualMarkers().push(marker); state.maintenanceMode = ''; render(); notify('已保存为待核对候选；确认后才会参与临床线索对照。');
  });
  $('#profileSwitch').addEventListener('click', () => { state.profileIndex = (state.profileIndex + 1) % APP.data.profiles.length; state.maintenanceMode = ''; state.candidateSeq = 0; state.candidateLabel = ''; state.candidateValue = ''; state.candidateSource = ''; state.candidateDate = ''; render(); notify('已切换演示档案；资料和确认状态按档案分别保存于本次页面内存。'); });
  $('#fontToggle').addEventListener('click', (event) => { state.font = (state.font + 1) % 3; document.body.dataset.font = ['normal','large','larger'][state.font]; event.currentTarget.setAttribute('aria-pressed', String(state.font > 0)); event.currentTarget.textContent = ['大字 Aa','更大字 A+','标准字 Aa'][state.font]; });
  $('#primerButton').addEventListener('click', (event) => primerView(event.currentTarget));
  $('#aboutButton').addEventListener('click', () => openAboutPage(false));
  $('#pageBack').addEventListener('click', () => backPage());
    $('#pageClose').addEventListener('click', () => closePageView());
  function isKnownPageLink(id) {
    if (id === 'about' || id === 'primer') return true;
    if (!id.startsWith('trial-')) return false;
    const trialId = id.slice(6);
    return APP.data.trials.some((item) => item.id === trialId) || APP.data.snapshot.trials.some((item) => item.id === trialId);
  }
  function openDeepLinkedPage(id) {
    if (!isKnownPageLink(id)) return;
    if (!history.state?.myeloPage) {
      history.replaceState({ myeloBase: true }, '', `${location.pathname}${location.search}`);
      history.pushState({ myeloPage: 1, key: id }, '', `#page=${encodeURIComponent(id)}`);
    }
    if (id.startsWith('trial-')) {
      const trialId = id.slice(6);
      if (APP.data.trials.some((item) => item.id === trialId)) openTrialDetail(trialId, null, true);
      else openSnapshotTrialDetail(trialId, null, true);
      return;
    }
    if (id === 'about') openAboutPage(true);
    if (id === 'primer') primerView(null, true);
  }
  window.addEventListener('popstate', (event) => {
    if (state.pageStack.length) {
      syncPageDepth(event.state?.myeloPage || 0);
      return;
    }
    if (location.hash.startsWith('#page=')) openDeepLinkedPage(decodeURIComponent(location.hash.slice(6)));
  });
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && state.pageStack.length) { event.preventDefault(); backPage(); } });
  window.addEventListener('beforeprint', () => { $$('details.phase-fold').forEach((d) => { d.dataset.printWasOpen = String(d.open); d.open = true; }); });
  window.addEventListener('afterprint', () => { $$('details.phase-fold').forEach((d) => { if (d.dataset.printWasOpen !== undefined) { d.open = d.dataset.printWasOpen === 'true'; delete d.dataset.printWasOpen; } }); });
  function openAboutPage(fromDeepLink = false) {
    const html = `<div class="page-view-inner"><section class="card card-pad">${cardHead('小浆宝 MyeloPal', '多发性骨髓瘤患者与照护者工作台原型',tag(`v${APP.version}`,'plum'))}<div class="notice">本项目处于 M0 后的 M1/M2 设计阶段。此页面是 HTML 交互原型，业务数据、AI、云端临床检索和 Desktop 原生会话均未接通。</div><div class="section-heading"><div><h2>数据来源</h2><p>合成档案与真实快照严格分开</p></div></div><ul><li>患者/照护者档案：合成演示资料</li><li>临床试验搜索摘录：2026-10-25 本地快照；快照可能过期，登记状态未核实</li><li>匹配条件演示：DEMO-MM- 前缀的合成条件，不是登记库原文</li></ul><p class="small-note">构建版本：v${APP.version} · 构建日期：2026-10-26 · 渠道：本地 HTML 原型 · 来源：myeloma-workbench M2</p></section></div>`;
    openPage('关于小浆宝', '看板 › 关于', html, $('#aboutButton'), 'about', fromDeepLink);
  }
  window.addEventListener('hashchange', () => {
    if (!location.hash.startsWith('#page=') || state.pageStack.length) return;
    openDeepLinkedPage(decodeURIComponent(location.hash.slice(6)));
  });
  render();
  if (location.hash.startsWith('#page=')) openDeepLinkedPage(decodeURIComponent(location.hash.slice(6)));
})();
