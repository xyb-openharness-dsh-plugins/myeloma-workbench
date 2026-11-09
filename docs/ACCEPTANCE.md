# 验收记录

代码版本/commit/dirty 状态：`0.1.1-rc.2` / 当前 `main` 工作树未提交；Starter `1.10.0-rc.2` 工作树亦有未提交修改
包名称/版本/tgz/SHA-256：`@xyb-community/myeloma-workbench@0.1.1-rc.2` / `release/xyb-community-myeloma-workbench-0.1.1-rc.2.tgz` / `40ad8a2ef29e10fea13d5d6795ba56a92c276969fee7cf445b537e6884725c94`
Desktop 版本/OS/架构/Node：DSH Desktop 0.12.0 / macOS arm64 / Node v22.19.0；app-owned profile pnpm 10.34.5
安装入口/实际 profile/执行位置：设置 `DSH_HOME="$HOME/Library/Application Support/dsh-desktop/harness"`，将 `$DSH_HOME/.desktop-bin` 放到 PATH，再用 `dsh plugin --profile web remove -w @xyb-community/myeloma-workbench` 和 `dsh plugin --profile web add -w --save-exact file:/Users/qinxiaoqiang/Downloads/myeloma-workbench/release/xyb-community-myeloma-workbench-0.1.1-rc.2.tgz` / app-owned Harness `profiles/web`
Agent 是否运行在目标 Desktop 内：未能附着至运行中 Desktop；未重启目标应用

| ID | 层级 | 操作和预期 | 真实结果 | 证据文件/命令 | 通过/失败/未验证/不适用 |
| --- | --- | --- | --- | --- | --- |
| ACC-00 | 静态 | `dsh-wb-cli audit` 无 fail；warn 逐条给结论 | 项目 `npm run audit` 为 21/30，8 fail / 1 warn：缺少 M5 版本模块、layout、DIFF-MATRIX 等目标项目工件，检查链模板也未识别当前扩展检查命令；未达到审计通过 | `npm run release:check`，2026-10-27 | 失败（尚不具备发布条件） |
| ACC-01 | 静态 | 语法/类型/包合同/清单 | `npm run check`、`npm test` 通过；项目检查器 staticPass=true、errors=[]；保留 config.root 与发行物/桌面验证两条警告 | `npm run check`、`npm test`，2026-10-27 | 通过（静态与测试范围） |
| ACC-02 | 集成 | 代表业务链与迁移/主体隔离 | 当前包仍为健康接口和接入骨架，生产业务流程尚未实现 | `dsh/index.js`、`lib/client.js` | 未验证（业务未实现） |
| ACC-03 | 包 | 从实际 tgz 安装，版本/hash 一致 | RC2 tarball 的 30/30 文件与 app-owned `profiles/web/node_modules/@xyb-community/myeloma-workbench` 逐字节一致；profile dependency 指向该 tarball，`dsh.profile.bundles` 含包名；安装副本含 `dsh/server.js` 和 `public/index.html`。排查确认此前同版安装保留了旧目录：安装目录 manifest 虽为 RC2，却缺少 `server.js`/`public/`，tarball 生成时间晚于该次安装；对 app-owned profile 卸载再添加后修复。 | RC2 SHA-256 `40ad8a2ef29e10fea13d5d6795ba56a92c276969fee7cf445b537e6884725c94`；30 个成员逐文件与 tarball 对照；`DSH_HOME=... PATH=... dsh plugin --profile web list`，2026-10-27 | 通过（包、profile 登记与安装副本） |
| ACC-04 | UI | 已安装列表→左侧入口→业务页 | app-owned profile CLI 列表显示 `@xyb-community/myeloma-workbench@0.1.1-rc.2`；安装副本执行 smoke test：客户端 `ModuleLoader` ID 与包名一致并成功调用 `desktopWorkbenches.register()`；服务端注册 2 条路由，健康接口 200、UI 首页 200、缺失文件返回 404。DSH Desktop 的当前 active 仍为 ANCA；浏览器控制没有 Desktop 页面，且未重启应用，未验证实际切换器入口与面板渲染。 | 安装副本 Node smoke test；Desktop `harness.log` 最近只记录 2026-10-27 09:32:14Z 的 HMR，未见 Myeloma 错误；`agent-browser` controlled/user tabs 均为空，2026-10-27 | 磁盘/入口 smoke test 通过；Desktop 运行界面未验证（需用户完整退出并重开后打开 Myeloma） |
| ACC-05 | UI | 无会话可用，所选布局和原生会话 | 包客户端为注册骨架；宿主加载和布局行为未在真机观察 | `lib/client.js`；未重启 Desktop | 未验证 |
| ACC-06 | UI | 一级/二级页与配置弹窗逐项对照 | 生产业务页面尚未实现 | 当前包内容 | 不适用（M5 未开始） |
| ACC-07 | UI | 窄容器/大字/翻面/趋势/键盘 | 生产业务页面及对应控件尚未实现 | 当前包内容 | 不适用（M5 未开始） |
| ACC-08 | 跨页 | 单一事实新增后各页一致 | 生产业务数据尚未实现 | 当前包内容 | 不适用（M5 未开始） |
| ACC-09 | 文件 | 预览/解析/确认/导出真实格式/回顾 | 生产文件流程尚未实现 | 当前包内容 | 不适用（M5 未开始） |
| ACC-10 | 外部 | API/MCP/cron 实际链路与失败恢复 | 只有健康接口；没有外部 API/MCP/cron 集成 | 当前包内容 | 不适用（M5 未开始） |
| ACC-32 | 数据 | 只读核验 manifest、JSONL、SQLite 的数量、hash、主键、逐字段映射与来源状态 | 原快照 257/257、SQLite integrity=ok、36 状态，但 49 条 CTV sponsor 为空；旁路修正版 257/257、36 状态、逐字段与摘要全部通过，修正来自原 JSONL，不是重采 | `node scripts/check-trial-snapshot.mjs research/myeloma-cancer`；`node scripts/check-trial-snapshot.mjs research/myeloma-cancer-20261027-corrected`，2026-10-27 | 原始版失败；修正版通过 |
| ACC-33 | 回流 | Starter 快照检查器回归及完整自检 | Starter `npm test`：66/66 通过；`npm run check` 的 204 项检查与 `check-starter` 均通过、errors=[]；Starter 当前版本 `1.10.0-rc.2`，工作树保留既有未提交修改 | Starter 本地工作区检查，2026-10-27 | 本地自检通过；M9 因未提交仍未关闭 |

附官方规范第 8 节每条适用项的责任、证据与结果，不适用写理由。只跑静态不能把 ACC-04 以后勾通过。
peer 安装警告：Desktop profile 仍提示 `cordis`、`dsh-client-connection`、`dsh-host-webserver`、`schemastery` peer 缺失及两个 peer 冲突；该提示也存在于既有工作台。新包的入口和静态 UI 本机 smoke test 通过，当前日志没有 Myeloma 专属失败记录；Desktop 当前 active 为 ANCA，浏览器自动化未能连接应用页面，实际切换器与面板渲染仍待验证。目标 Desktop 需由用户手动完整退出并重开，再切换到 Myeloma；本机 Agent 未重启应用。原始 M4 快照保留 49 条 sponsor 映射差异；修正版旁路副本通过字段核验。M1/G1、M2/G2 未签认，M5 生产业务 UI 未实现。无提交、推送、发布或外部投稿。

## 设计与混合数据补充

| ID | 操作与预期 | 结果/证据 | 状态 |
| --- | --- | --- | --- |
| ACC-11 | UI 确认版本与实际实现对应；关键流程、容器尺寸、异常状态有预览 | | 未验证 |
| ACC-12 | 重启恢复记录；首页/详情/导出/Agent 快照一致 | | 未验证 |
| ACC-13 | 纠正/删除后旧摘要和缓存失效，主体与工作区隔离 | | 未验证 |
| ACC-14 | 可选记忆服务离线/同步失败仍能操作业务；恢复后幂等追平 | | 未验证 |
| ACC-15 | 资料目录/会话双状态独立；无会话、目录故障、owner异常、映射未保存均不显示假绿灯 | | 未验证 |
| ACC-16 | 快速切换丢弃旧状态，重启重新核验；窄面板/大字下状态可读且不遮公共入口 | | 未验证 |
| ACC-17 | 主任务常显、辅助配置可展开、💡教学可发现；错误不隐藏，关闭/展开不丢输入 | | 未验证 |
| ACC-18 | 外部字段来源/时效/适用性可追溯；获取失败、过期、冲突不被展示或导出为确定事实 | | 未验证 |

| ACC-19 | 长列表滚到中段/底部后标题与关闭仍可见，工具/提交按需固定；窄窗/大字可操作、选择保留、可从底部关闭并恢复焦点 | | 未验证 |

未启用可选记忆时相关项标不适用并说明。UI 确认属于设计验收，不替代实际 Desktop 加载与业务验收。

| ACC-20 | 设置入口可达、目录状态真实、取消无副作用、换目录保护旧资料 | | 未验证 |
| ACC-21 | 凭据无明文回显；云端按文件授权；本地降级和错误恢复 | | 未验证 |
| ACC-22 | 临床数据包与患者目录区分，地区/版本/核验状态可见 | | 未验证 |
| ACC-23 | 设置草稿保存/取消/失败保持正确，窄窗/键盘可达 | | 未验证 |

## 发布范围（仅执行用户明确授权的动作）

| ID | 操作与预期 | 结果/证据 | 状态 |
| --- | --- | --- | --- |
| ACC-24 | 记录本机安装 / Git 推送 / GitHub Release / 市场PR分别完成到哪一步；未授权项为不适用 | RC2 tarball 已经目标 app-owned profile CLI 卸载旧副本后重新安装，30/30 文件匹配；未推送、未建 GitHub Release、未投稿市场 | 本机包安装通过；Desktop UI 待手动重启和切换确认；其余未执行 |
| ACC-25 | 市场安装来源与条目一致；Release只有在YAML显式tarball时才是所选来源，否则按目录协议使用源码或npm | | 未验证 |
| ACC-26 | 包版本、客户端版本、实际安装副本、tar hash一致；Desktop运行界面加载单独确认 | package / VERSION / demo 数据显示 `0.1.1-rc.2`；安装目录 30/30 文件与 tgz 字节一致，tar SHA-256 见 ACC-03；Desktop active 仍是 ANCA，未重启或打开 Myeloma | 包与磁盘副本通过；运行时 UI 未验证 |
| ACC-27 | 真实市场PR URL、最新检查、合并状态、目录可见和市场可安装分别记录；不得把PR提交称为已上架 | | 未验证 |

## DSH 原生 Agent 对话

| ID | 操作与预期 | 结果/证据 | 状态 |
| --- | --- | --- | --- |
| ACC-28 | 全局顶栏 AI 对话入口可发现；状态文案与宿主真实连接状态一致；首次显式点击只创建/复用一个归属正确的原生会话 | | 未验证 |
| ACC-29 | 隐藏原生面板后可从顶栏重新打开同一会话；页面筛选、表单、滚动位置和原生草稿保留；隐藏不等于结束会话 | | 未验证 |
| ACC-30 | 面板宽度按当前宿主形态调整；CustomFrame 鼠标/触控/键盘均可调且受边界约束，split 只使用宿主布局合同；未支持时明确记录限制，不显示假控制 | | 未验证 |
| ACC-31 | 面板开合、调宽、窄窗及重启恢复偏好符合 SPEC；焦点、键盘可达性与主业务区可操作性通过实际验收 | | 未验证 |
