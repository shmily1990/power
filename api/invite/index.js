import http from '@/request/index.js'


export function getInviteTotal(data) { // 总览
  return http.post('/api/keeper/InviteManage/inviteTotal', data)
}

export function getInvitePage(data) { // 邀约列表
  return http.post('/api/keeper/InviteManage/invitePage', data)
}

export function getInviteInfo(data) { // 邀约详情
  return http.post('/api/keeper/InviteManage/inviteInfo', data)
}

export function getUserDetail(data) { // 用户信息
  return http.post('/api/keeper/InviteManage/userDetail', data)
}

export function excuteInviteOperation(data) { // 邀约操作
  return http.post('/api/keeper/InviteManage/inviteOperation', data)
}

export function getEventInfo(data) { // 获取事件列表
  return http.post('/api/keeper/InviteManage/eventInfo', data)
}

export function getUserInfo(data) { // 获取事件列表
  return http.post('/api/keeper/InviteManage/userInfo', data)
}