import http from '@/request/index.js'
export function login(data) { // 登录
	return http.post('/api/auth/account/login', data, {
		params:{},
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}

export function getUserInfo(data) { // 个人信息
	return http.post('/api/erp/Mobile/Information', data)
}

export function updatePassword(data) { // 修改密码
	return http.post('/api/erp/Mobile/Password', data)
}

