/**
 * 领域服务：资料根 → 开库 → 档案（subjects）。C 型起步只放「必须落库」的部分；
 * 八类记录的写链在各自功能线接入时只增不改（见 schema/0001 注释）。
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { openStore, closeStore, migrate } from './store.js'
/** 库文件名：与家族口径一致，落在用户选的资料目录里；卸载工作台不删目录。 */
const DB_FILE = 'workbench.sqlite'

export class Workbench {
  /** @param {object} o @param {string} o.root 用户资料目录（调用方负责口径校验） */
  constructor({ root, seedDemo = true } = {}) {
    if (typeof root !== 'string' || root.trim() === '') throw new Error('Workbench 需要 root（用户资料目录）')
    this.root = root
    this.dbFile = join(root, DB_FILE)
    this.db = null
    this.seedDemo = seedDemo
  }

  open() {
    if (this.db) return this
    this.db = openStore(this.dbFile)
    this.migrations = migrate(this.db)
    /* 用户上次选过的资料目录优先于 cordis 默认值（目录还在才生效）——
       少了这一步，「配置目录」选完重开 Desktop 又回到默认位置，等于没选。 */
    if (!this._rootApplied) {
      this._rootApplied = true
      try {
        const row = this.db.prepare("SELECT value FROM app_setting WHERE key='data_root'").get()
        if (row?.value && row.value !== this.root && existsSync(row.value)) {
          closeStore(this.db)
          this.root = row.value
          this.dbFile = join(this.root, DB_FILE)
          this.db = openStore(this.dbFile)
          this.migrations = migrate(this.db)
        }
      } catch { /* 旧库没有 app_setting 也不该拦住打开 */ }
    }
    return this
  }

  close() { if (this.db) { closeStore(this.db); this.db = null } }

  get dataRoot() { return this.root }

  /** 切换资料目录：先开新库成功再替换，失败回滚到原库。 */
  setDataRoot(nextRoot) {
    this.open()
    const dir = String(nextRoot || '').trim()
    if (!dir || dir === this.root) return this.root
    const prevRoot = this.root
    const prevFile = this.dbFile
    closeStore(this.db)
    this.db = null
    try {
      this.dbFile = join(dir, DB_FILE)
      this.db = openStore(this.dbFile)
      this.migrations = migrate(this.db)
      this.root = dir
      this.db.prepare("INSERT INTO app_setting(key,value,updated_at) VALUES('data_root',?,datetime('now')) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at").run(dir)
      return this.root
    } catch (error) {
      this.root = prevRoot
      this.dbFile = prevFile
      try { this.db = openStore(this.dbFile) } catch { this.db = null }
      throw error
    }
  }

  listSubjects() {
    this.open()
    return this.db.prepare('SELECT profile_key, name, meta, is_demo, created_on FROM subjects ORDER BY rowid DESC')
      .all().map((r) => ({ profileKey: r.profile_key, name: r.name, meta: r.meta, isDemo: !!r.is_demo, createdOn: r.created_on }))
  }

  /** 新建患者档案：is_demo=0，profile_key 用 local-<时间戳>（不与 demo 撞键，不拿姓名当键）。 */
  createSubject({ name, meta } = {}) {
    this.open()
    const clean = String(name || '').trim()
    if (!clean) throw new Error('请填写档案名（可以是昵称）')
    if (clean.length > 40) throw new Error('档案名太长（≤40 字）')
    const key = 'local-' + Date.now().toString(36)
    this.db.prepare('INSERT INTO subjects (profile_key, name, meta, is_demo) VALUES (?,?,?,0)').run(key, clean, String(meta || '').trim() || null)
    return { profileKey: key, name: clean }
  }

  /** demo 档案（is_demo=1）受保护：只能删自己建的。 */
  deleteSubject(profileKey) {
    this.open()
    const key = String(profileKey || '')
    this.db.prepare('DELETE FROM subjects WHERE profile_key = ? AND is_demo = 0').run(key)
    return { deleted: key }
  }
}
