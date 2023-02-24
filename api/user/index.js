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

