import login from '~/api/login'

export const state = () => {
	return {
		//认证用户
		user: null,
		//用户 token
		token: null
	}
}

export const mutations = {
	setUser(state, user) {
		if (user === null) {
			state.user = user || null
			state.token = null
		} else {
			state.user = user || null
		}
	},

	setToken(state, token) {
		state.token = token
	}
}

const beginInvoke = function(commit) {
	commit('setLoading', true, { root: true })
	commit('clearError', null, { root: true })
}

export const actions = {
	signUserIn({ commit }, payload) {
		beginInvoke(commit)

		login
			.login(payload.userName, payload.password)
			.then(res => {
				console.log('res token:' + res.data.token)
				commit('setUser', res.data.user)
				commit('setToken', res.data.token)
				commit('setLoading', false, { root: true })
				this.$axios.setToken(res.data.token)
			})
			.catch(err => {
				console.log(err)
				commit('setError', err, { root: true })
				commit('setLoading', false, { root: true })
				this.$axios.setToken('')
			})
	},
	//注销用户
	logout({ commit}) {
		login.logout().catch(err => {
			console.log(err)
			commit('setError', err)
		})
		commit('setUser', null)
		commit('setToken', null)
		this.$axios.setToken('')
	}
}

export const getters = {
	token(state) {
		return state.token
	},
	//用户对象
	user(state) {
		if(state.user){
			return state.user
		}
		return {}
	},

	/**
	 * 获取 用户名
	 * @param {*} state
	 */
	userName(state) {
		if (!state.user) {
			return ''
		}
		if (state.user.fullName) {
			return state.user.fullName
		}
		return state.user.userName
	},

	// 用户标签(名字首字母)
	nameLabel(state,getters) {
		if (getters.userName) {
			return getters.userName[0].toUpperCase()
		} else {
			return ''
		}
	},
	//用户所在部门代码
	depCode(state){
		if(state.user && state.user.depCode){
			return state.user.depCode
		}
		return ''
	}
}
