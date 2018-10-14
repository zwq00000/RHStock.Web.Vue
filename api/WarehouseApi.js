/**
 * class Warehouse Api
 * @description
 */

'use strict'
import pages from './pages'
import fetch from './fetch'

/**
 * GetWarehouses 获取仓库信息
 * @param {string}  searchStr @description 搜索内容
 * @param {Number}  pageSize @description 分页大小
 * @param {Number}  page @description 当前页码
 * @returns axios.get Promission
 */
const GetWarehouses = function(year, options) {
	let path = `/api/Warehouse/${year}`
	return fetch.get(path, pages.toParams(options))
}

/**
 * GetWarehouse 根据仓库代码获取仓库信息
 * @param {string}  whCode @description
 * @returns axios.get Promission
 */
const GetWarehouse = function(year, whCode) {
	let path = `/api/Warehouse/${year}/${whCode}`
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
