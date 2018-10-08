import axios from 'axios'
//import config from '../config/config.js'

// 创建axios实例
const Axios = axios.create({
	baseURL: process.env.baseUrl,
	// 请求超时时间
	timeout: 5000
})

/**
 * @param {Number}  pageSize @description 页面大小
 * @param {Number}  page @description 当前页码
 * @param {string}  keyword @description 查询关键字
 * @param {array}  sort @description 排序字段
 * @param {string}  orderBy @description 排序方式
 */
const pageOptions = {
	// 页面大小
	pageSize: 20,
	// 当前页码
	page: 1,
	// 查询关键字
	searchKey: '',
	// 排序字段
	sort: '',
	// 排序方式
	orderBy: '',

	mergeResult: function(result) {
		mergePageResult(this, result)
	},
	toParams: function() {
		return toPageParams(this)
	}
}

// request拦截器
Axios.interceptors.request.use(
	config => {
		// 下面会说在什么时候存储 token
		if (localStorage.token) {
			config.headers.Authorization = 'JWT ' + localStorage.token
		}
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// respone拦截器
Axios.interceptors.response.use(
	response => {
		// code为非20000是抛错 可结合自己业务进行修改
		if (response.status >= 400) {
			Notice.info({
				title: `${response.status}`,
				desc: response.statusText,
				duration: 5 * 1000
			})
		}
		return response
	},
	error => {
		if (error.response.status === 401) {
			// 401 说明 token 验证失败
			// 可以直接跳转到登录页面，重新登录获取 token
			location.href = '#/login'
		} /*
    else if (error.response.status === 500) {
      // 服务器错误
      Notice.error({
        title: error.message,
        desc: error.config.baseURL,
        duration: 5
      })
    }*/
		if (error.response.data.error) {
			return Promise.reject(error.response.data.error)
		}

		return Promise.reject(error)
	}
)

/**
 * 合并查询结果
 * @param {*} pageOptions
 * @param {pageResult} result
 */
const mergePageResult = function(pageOptions, result) {
	pageOptions.page = result.page || 1
	pageOptions.pageSize = result.pageSize
	pageOptions.pages = result.pages || 0
	pageOptions.total = result.total
}

const toPageParams = function(options) {
	if (options) {
		return {
			page: options.page || 1,
			pageSize: options.pageSize || 20,
			searchKey: options.searchKey
		}
	} else {
		return pageOptions
	}
}

export default {
	get: Axios.get,
	post: Axios.post,
	Axios,
	pageOptions,
	toPageParams
}
