/**
 * class Warehouse Api
 * @description
 */

'use strict'
import fetch from './fetch.js'

/**
 * GetWarehouses 获取仓库信息
 * @param {string}  searchStr @description 搜索内容
 * @param {Number}  pageSize @description 分页大小
 * @param {Number}  page @description 当前页码
 * @returns axios.get Promission
 */
const GetWarehouses = function(year, searchStr, pageSize, page) {
	let path = `/api/Warehouse/${year}`
	let params = {}
	params['searchStr'] = searchStr
	params['pageSize'] = pageSize
	params['page'] = page

	return fetch.get(path, { params })
}

/**
 * GetWarehouse 根据仓库代码获取仓库信息
 * @param {string}  whCode @description
 * @returns axios.get Promission
 */
const GetWarehouse = function(year, whCode) {
	let path = `/api/Warehouse/${year}/${whCode}`
	let params = {}

	return fetch.get(path, { params })
}

/**
 * 获取 仓库代码
 * @param {string} depCode 部门代码
 */
const GetWhCodes = function(year, depCode) {
	if (!depCode) {
		depCode = '002'
	}
	let path = `/api/Warehouse/whcodes/${year}/${depCode}`
	return fetch.get(path)
}

export default {
	GetWarehouses,
	GetWarehouse,
	GetWhCodes
}
