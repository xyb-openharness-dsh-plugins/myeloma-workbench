// 面板与布局参数的唯一声明处（本仓客户端为单文件、无构建注入步，
// 参数以字面量写在 lib/client.js；scripts/check-version.mjs 会比对两处，分叉即红）。
export const PANEL = Object.freeze({ customFrame: true, businessSide: 'left', businessWidth: 0.65 })
export const AGENT_PANE = Object.freeze({
  min: 0.25, max: 0.45, default: 0.35, step: 0.02, narrowBelowPx: 760, drawerMaxPx: 420,
})
export const CLIENT_LAYOUT = Object.freeze({
  customFrame: PANEL.customFrame, businessSide: PANEL.businessSide, businessWidth: PANEL.businessWidth,
  agentPane: { min: AGENT_PANE.min, max: AGENT_PANE.max, default: AGENT_PANE.default, step: AGENT_PANE.step,
    narrowBelowPx: AGENT_PANE.narrowBelowPx, drawerMaxPx: AGENT_PANE.drawerMaxPx },
})
