export default function({ $axios, redirect,store}) {
	$axios.onRequest(config => {
		
		// 下面会说在什么时候存储 token
		if (store.getters.isAuthenticated) {
			let token = store.getters['user/token']
			$axios.setToken(token, 'Bearer')
		}
		return config
	})

	$axios.onError(error => {
		console.log(error) // for debug
		const code = parseInt(error.response && error.response.status)
		if (code === 400) {
			redirect('/400')
		}
		if (code === 401) {
			// 401 说明 token 验证失败
			// 可以直接跳转到登录页面，重新登录获取 token
			location.href = '#/user/login'
		}
	})
}
