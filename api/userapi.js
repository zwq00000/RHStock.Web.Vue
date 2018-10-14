import pages from './pages'

/**
 * 获取用户列表
 * @param {pages.pagination} options 
 */
const getUsers = function(pagination) {
	return $nuxt.$axios.get(`/api/users`, pages.toParams(pagination))
}

/**
 * 更新用户数据
 * @param {user} user
 */
const update = function(user) {
	return $nuxt.$axios.put(`/api/Users/${user.uid}`, user)
}

/**
 * 删除用户
 * @param {*} user 
 */
const remove = function(user){
	return $nuxt.$axios.delete(`/api/Users/${user.uid}`)
}

/**
 * 注册用户
 * @param {user} user 
 */
const register = function(user){
	return $nuxt.$axios.post('/api/users',user)
}

export default {
	getUsers,
	update,
	remove,
	register,
    mergePageination:pages.mergePageination
}
