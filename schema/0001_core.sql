-- 0001（初建）：患者档案 + 运行时设置。
-- subjects.is_demo：demo 与真实档案分开标记；demo 不可删、不覆盖自建档案。
-- 为什么只有两张表起步：先把「新建档案 → 落库 → 多档案切换」闭环做通，
-- 八类记录（症状/化验/治疗/…）的表在各自功能线接入时只增不改。
CREATE TABLE IF NOT EXISTS subjects (
  profile_key TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  meta        TEXT,
  is_demo     INTEGER NOT NULL DEFAULT 0,
  created_on  TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS app_setting (
  key        TEXT PRIMARY KEY,
  value      TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
