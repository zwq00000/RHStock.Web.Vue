import login from '~/api/login'

export const state = () => {
	return {
		//认证用户
		user: null,
		//用户 token
		token:null,
		//加载状态
		loading: false,
		//错误信息
		error: null,
		//账套年份
		accYear:2016,
		accYears:[]
	}
}

export const mutations = {
	SET_USER(state, user) {
		if(user=== null){
			state.user = user || null
			state.token = null
		}else{
			state.user = user || null
		}
	},

	//设置账套年度
	setAccYear(state,year){
		state.accYear = year
	},

	/**
	 * 可用账套年度
	 * @param {*} state 
	 * @param {int[]} years 
	 */
	setAccYears(state,years){
		state.accYears = years
	},

	setToken(state,token){
		state.token = token
	},
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
	signUserIn({ commit }, payload) {
		commit('setLoading', true)
		commit('clearError')

		login
			.login(payload.userName, payload.password)
			.then(res => {
				console.log("res token:" + res.data.token)
				commit('SET_USER', res.data.user)
				commit('setToken',res.data.token)
				commit('setLoading',false)
			})
			.catch(err => {
				console.log(err)
				commit('setError', err)
				commit('setLoading',false)
			})
	},
	//注销用户
	logout({commit}){
		login.logout().catch(
			err=>{
				console.log(err)
				commit('setError', err)
			}
		)
		commit('SET_USER',null)
		commit('setToken',null)
	}
}

export const getters = {
	isAuthenticated(state) {
		return !!state.user
	},

	token(state){
		return state.token
	},
	user(state) {
		return state.user
	},

	/**
	 * 获取 用户名
	 * @param {*} state 
	 */
	userName(state){
		if(state.user.fullName){
			return state.user.fullName
		}
		return state.user.userName
	},

	accYear(state){
		return state.accYear
	},

	/**
	 * 可用账套年度
	 * @param {*} state 
	 */
	accYears(state){
		return state.accYears
	},

	loading(state) {
		return state.loading
	},
	error(state) {
		return state.error
	}
}
