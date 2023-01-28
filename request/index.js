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
	if (userToken) {
		if (!apiWhiteList.includes(config.url)) { // 不再白名单加上token
			config.header = {
				...config.header,
				userToken
			}
		} else {
			config.header = {
				...config.header,
			}
		}

	} else {
		uni.redirectTo({
			url: "/pages/cockpit/index"
		})
	}
	// console.log(config)

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
			resultCode
		}
	} = response
	if (resultCode !== 0) {
		if (!noMessage.includes(url)) {
			await showTextToast(data.message)
		}
		Promise.reject(data)
	}
	uni.hideLoading();
	return data
},
	error => {
		uni.hideLoading();
		errorHandling(error)
		return Promise.reject(error)
	})
export default http
