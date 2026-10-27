const TRIAL_IMPLEMENTATION = /function\s+(?:matchView|trialProfileView|evaluateSyntheticTrial|renderTrialResults|renderTrialMatches)\s*\(|data-trial-tab\s*=|trialTab\s*:/;

export function shouldCheckTrialMatching(source) {
  return TRIAL_IMPLEMENTATION.test(source);
}

export function inspectTrialMatching(source) {
  const failures = [];
  const requireText = (needle, label = needle) => {
    if (!source.includes(needle)) failures.push(`missing ${label}`);
  };
  const forbid = (pattern, label) => {
    if (pattern.test(source)) failures.push(`forbidden ${label}`);
  };

  requireText('建档', 'profile tab');
  requireText('检索', 'search tab');
  requireText('匹配结果', 'results tab');
  requireText('无法自动匹配', 'unmatched reason state');
  requireText('结构化命中', 'structured evidence tier');
  requireText('文本命中', 'text evidence tier');
  requireText('宽口径', 'broad evidence tier');
  requireText('登记状态，未核实', 'unverified registration status');
  requireText('snapshotDate', 'snapshot date disclosure');
  requireText('演示状态，未发起实时查询', 'non-live status disclosure');
  requireText('FAILED', 'failed source status');
  requireText('DENIED', 'denied source status');
  requireText('NEEDS_SETUP', 'not configured source status');
  requireText('粗筛符合度 = 符合条件数 ÷ 全部已对照条件数', 'declared rough-screen formula');
  requireText('待确认项不计入符合项、仍计入分母', 'unknown criteria denominator semantics');
  requireText('硬性条件不满足', 'hard failure band');
  requireText('高度符合', 'high band');
  requireText('部分符合', 'partial band');
  requireText('需补充信息', 'needs information band');
  requireText('用户偏好不计分', 'preference excluded from calculation');
  requireText('真实快照不计算粗筛比例', 'real snapshot score boundary');
  if (!/FAILED[^\n]{0,100}(?:不计|不算)|(?:不计|不算)[^\n]{0,100}FAILED/s.test(source)) failures.push('FAILED must not count as searched/covered');
  if (!/DENIED[^\n]{0,100}(?:不计|不算)|(?:不计|不算)[^\n]{0,100}DENIED/s.test(source)) failures.push('DENIED must not count as searched/covered');
  forbid(/\bmatch_score\b/i, 'match_score field');
  forbid(/\beligible\b/i, 'eligible judgment field');
  forbid(/\bsuitability\b/i, 'suitability judgment field');
  forbid(/(?:适配度|入组概率)\s*[:：]?\s*\d+(?:\.\d+)?\s*%?/, 'eligibility probability language');
  forbid(/(?:综合匹配分|匹配总分|总匹配分)\s*[:：]?\s*\d+/, 'numeric composite match score');
  forbid(/(?:适合入组|符合入组资格|不符合入组资格)/, 'eligibility conclusion');
  return failures;
}

export function runSelfTests() {
  const valid = `function evaluateSyntheticTrial(){ const tabs=['建档','检索','匹配结果']; return '命中 无法自动匹配 结构化命中 文本命中 宽口径 登记状态，未核实 snapshotDate 演示状态，未发起实时查询 FAILED DENIED NEEDS_SETUP；FAILED 不计成功覆盖；DENIED 不算查过；粗筛符合度 = 符合条件数 ÷ 全部已对照条件数；待确认项不计入符合项、仍计入分母；硬性条件不满足；高度符合；部分符合；需补充信息；用户偏好不计分；真实快照不计算粗筛比例'; }`;
  const invalid = `${valid} const match_score = 82; const eligible = true; const suitability = 'high';`;
  const navigationOnly = `const tabs = ['临床试验', '检索'];`;
  const wrongDenominator = valid.replace('待确认项不计入符合项、仍计入分母', '待确认项不参与分母');
  const results = [
    { name: 'valid v2 evidence and rough-screen module', pass: shouldCheckTrialMatching(valid) && inspectTrialMatching(valid).length === 0 },
    { name: 'forbidden score and eligibility fields', pass: inspectTrialMatching(invalid).some((x) => x.includes('match_score')) && inspectTrialMatching(invalid).some((x) => x.includes('eligible')) && inspectTrialMatching(invalid).some((x) => x.includes('suitability')) },
    { name: 'wrong denominator semantics rejected', pass: inspectTrialMatching(wrongDenominator).some((x) => x.includes('denominator semantics')) },
    { name: 'navigation alone does not trigger', pass: !shouldCheckTrialMatching(navigationOnly) },
  ];
  return results;
}
