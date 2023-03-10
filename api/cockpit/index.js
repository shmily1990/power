import http from '@/request/index.js'


export function queryResourceOverview(data) { // 查询资源总览
  return http.post('/api/keeper/Cockpit/QueryResourceOverview', data)
}

export function queryResourceDistribution(data) { // 查询资源分页
  return http.post('/api/keeper/Cockpit/QueryResourceDistribution', data)
}

export function quertyRegulatoryAbilityMonitoring(data) { // 查询调控能力监控
  return http.post('/api/keeper/Cockpit/QuertyRegulatoryAbilityMonitoring', data)
}

export function quertyRegulatoryAbilityDistribute(data) { // 查询调控能力分布
  return http.post('/api/keeper/Cockpit/QuertyRegulatoryAbilityDistribute', data)
}

export function queryRespCurve(data) { // 查询事件曲线
  return http.post('/api/keeper/Cockpit/QueryRespCurve', data)
}