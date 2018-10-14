/**
 * 用户登录
 * @param {string} username
 * @param {password} password
 * @param {workDate} date
 */
const login = (username, password) => {
	return $nuxt.$axios.post('/auth/login', { username, password })
}

/**
 * 获取用户信息
 * @param {string} token
 */
const getInfo = token => {
	return $nuxt.$axios.get('/auth/info', { token })
}

/**
 * 注销
 */
const logout = () => {
	return $nuxt.$axios.post('/auth/logout')
}

export default {
	login,
	getInfo,
	logout
}
