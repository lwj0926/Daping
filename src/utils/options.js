// 组织类型
export const orgTypeOptions = [
  { key: 2, display_name: '二级单位' },
  { key: 3, display_name: '三级单位' }
]

// 报表类型
export const reportTypeOptions = [
  { key: 1, display_name: '购销存日报表' },
  { key: 2, display_name: '贸易气量日报表' },
  { key: 3, display_name: '黄冈工厂日报表' }
]

// 气源类型
export const gasSourceTypeOptions = [
  { key: 1, display_name: '管道线' },
  { key: 2, display_name: 'CNG' },
  { key: 3, display_name: 'LNG' },
  { key: 4, display_name: 'LPG' }
]

// 用户状态
export const userStatusTypeOptions = [
  { key: 0, display_name: '启用', type: 'success' },
  { key: 1, display_name: '禁用', type: 'danger' }
]

export const auditTypeOptions = [
  { key: 1, display_name: '已暂存', type: 'info' },
  { key: 2, display_name: '审核中', type: 'warning' },
  { key: 3, display_name: '已上报', type: 'success' },
  { key: 4, display_name: '已退回', type: 'danger' }
]
