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
  return http.post('/api/keeper/userManage/userList', data)
}

export function getUserInfo(data) { // 获取用户信息
  return http.post('/api/keeper/userManage/seeInfo', data)
}

export function getTypeList(data) { // 获取用户类型信息
  return http.post('/api/keeper/userManage/typeList', data)
}

export function getRegionList(data) { // 获取区域信息
  return http.post('/api/keeper/userManage/regionList', data)
}
