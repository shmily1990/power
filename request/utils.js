const httpCode = {
	400: '请求参数错误！',
	401: '权限不足, 请重新登录！',
	403: '服务器拒绝本次访问！',
	404: '请求资源未找到！',
	500: '服务端异常，请稍后重试！',
	501: '服务器不支持该请求中使用的方法！',
	502: '网关错误！',
	504: '网关超时！'
}

export function showTextToast(title) {
return new Promise((resolve,reject)=>{
	uni.showToast({
			title: title || '',
			icon: 'none',
			success:function(){
				setTimeout(()=>{
					resolve()
				},1500)
			}
		})
	})
}

export function errorHandling(error) {
	let tips = error.statusCode in httpCode ? httpCode[error.statusCode] : '请求异常，请稍后重试！'
	showTextToast(tips, 1000)
}
