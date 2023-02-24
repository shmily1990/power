import request from '../js_sdk/luch-request/luch-request/index.js'
import {
	domain
} from '@/static/config.js'
const http = new request()
const apiWhiteList = ['/api/auth/account/login']
const noMessage = ['/api/erp/Mobile/Information']

import {
	showTextToast,
	errorHandling
} from './utils.js'

/*
	请求域名：s
	测试：https://sy-api-test.powneng.com
	生产：https://sy-api.powneng.com
*/
http.setConfig((config) => {
	config.baseURL = domain
	config.timeout = 60000
	return config
})
//请求拦截
http.interceptors.request.use((config) => {
	const userToken = uni.getStorageSync('token')
	console.log(userToken, 2323)
	if (userToken) {
		if (!apiWhiteList.includes(config.url)) { // 不再白名单加上token
			config.header = {
				...config.header,
				Authorization: `PNT ${userToken}`
			}
		}
	}
	uni.showLoading({
		title: '加载中',
		mask: true
	})
	return config
}, config => {
	return Promise.reject(config)
})
// 响应拦截
http.interceptors.response.use(async (response) => {
	const url = response.config.url
	const {
		data,
		data: {
			resultCode,
			message
		}
	} = response
	if (resultCode !== 0) {
		if (!noMessage.includes(url)) {
			await showTextToast(message)
		}
		Promise.reject(data)
	}
	uni.hideLoading();
	return data
},
	error => {
		uni.hideLoading();
		// 如果token过期跳转到登录页
		if (error.statusCode === 401) {
			uni.redirectTo({
				url: "/pages/login/index"
			})
		}
		errorHandling(error)
		return Promise.reject(error)
	})
export default http
