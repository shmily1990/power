import http from '@/request/index.js'
// export function login(data) { // 登录
//   return http.post('/api/auth/account/login', data, {
//     params: {},
//     header: {
//       'content-type': 'application/x-www-form-urlencoded'
//     }
//   })
// }

export function getUserList(data) { // 获取用户列表
  return http.post('/api/keeper/UserManage/userList', data)
}

export function getUserInfo(data) { // 获取用户信息
  return http.post('/api/keeper/UserManage/seeInfo', data)
}

export function getTypeList(data) { // 获取用户类型信息
  return http.post('/api/keeper/UserManage/typeList', data)
}

export function getRegionList(data) { // 获取区域信息
  return http.post('/api/keeper/UserManage/regionList', data)
}

export function getUserDevice(data) { // 获取设备列表
  return http.post('/api/keeper/UserManage/userDevice', data)
}

export function addUser(data) { // 新建用户
  return http.post('/api/keeper/UserManage/addInfo', data)
}

export function updateUser(data) { // 更新用户
  return http.post('/api/keeper/UserManage/updateInfo', data)
}