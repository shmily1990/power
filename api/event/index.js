import http from '@/request/index.js'


export function queryEventTotal(data) { // 事件总览
  return http.post('/api/keeper/EventManage/QueryEventTotal', data)
}

export function queryEventByStatusWithPage(data) { // 查询列表
  return http.post('/api/keeper/EventManage/QueryEventByStatusWithPage', data)
}

export function queryEventByID(data) { // 根据id查询事件详情
  return http.post('/api/keeper/EventManage/QueryEventByID', data)
}

export function updateEvent(data) { // 更新
  return http.post('/api/keeper/EventManage/UpdateEvent', data)
}

export function addEvent(data) { // 新增
  return http.post('/api/keeper/EventManage/AddEvent', data)
}