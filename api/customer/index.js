import http from '@/request/index.js'


export function seeInfo(data) { // 获取用户信息
  return http.post('/api/keeper/Customer/seeInfo', data)
}

export function customerInvite(data) { // 当前邀约列表
  return http.post('/api/keeper/Customer/customerInvite', data)
}

export function customerInviteDetails(data) { // 邀约详情
  return http.post('/api/keeper/Customer/customerInviteDetails', data)
}

export function operateCustomerInvite(data) { // 操作邀约
  return http.post('/api/keeper/Customer/operateCustomerInvite', data)
}