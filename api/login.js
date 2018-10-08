import fetch from './fetch'

/**
 * 用户登录
 * @param {string} username
 * @param {password} password
 * @param {workDate} date
 */
const login = (username, password) => {
  return fetch.post('/account/login', { username, password })
}

/**
 * 获取用户信息
 * @param {string} token
 */
const getInfo = token => {
  return fetch.get('/account/info', { token })
}

/**
 * 注销
 */
const logout = () => {
  return fetch.post('/account/logout')
}

export default {
  login,
  getInfo,
  logout
}
