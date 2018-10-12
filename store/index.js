
export const state = () => {
	return {
		//加载状态
		loading: false,
		//错误信息
		error: null,
	}
}

export const mutations = {
	setLoading(state, payload) {
		state.loading = payload
	},
	setError(state, payload) {
		state.error = payload
	},
	clearError(state) {
		state.error = null
	}
}

export const actions = {

}

export const getters = {
	//用户是否登录
	isAuthenticated(state) {
		return !!state.user.user
	},

	loading(state) {
		return state.loading
	},
	error(state) {
		return state.error
	}
}
