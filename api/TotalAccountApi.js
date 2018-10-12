/**
 * class TotalAccount Api
 * @description
 */

'use strict'
import fetch from './fetch'
import pages from './pages'


/**
* getTotalAccounts 获取 指定仓库的库存总账
GET: api/TotalAccount
* @param {string}  whCode @description 仓库代码
* @param {Date}    accMonth @description 账套月度
* @param {pageOptions} options @description 查询参数
* @returns axios.get Promission
*/
const getTotalAccounts = function(whCode, year, month, options) {
	let path = `/api/TotalAccount/${whCode}/${year}/${month}`
	return fetch.get(path, pages.toParams(options))
}

/**
 * 获取全年库存总账数据
 * GET:/api/TotalAccount/{whCode}/{year}
 */
const getFullYear = function(whCode, year, options) {
	let path = `/api/YearTotalAccount/${whCode}/${year}`
	return fetch.get(path, pages.toParams(options) )
}

/**
 * 创建全年库存总账
 */
const createFullYear = function(whCode, year) {
	let path = `/api/YearTotalAccount/${whCode}/${year}`
	return fetch.post(path)
}

/**
 * buildTotalAccount
 * @param {string}  whCode @description
 * @param {Number}  month @description
 * @returns axios.post Promission
 */
const buildTotalAccount = function(whCode, month) {
	let path = `/api/TotalAccount/${whCode}/${month}`
	let params = {}

	return fetch.post(path, { params })
}

/**
 * clearTotalAccounts DELETE: api/ApiWithActions/5
 * @param {string}  whCode @description 仓库代码
 * @param {Number}  month @description 月份
 * @returns axios.delete Promission
 */
const clearTotalAccounts = function(whCode, month) {
	let path = `/api/TotalAccount/${whCode}/${month}`
	let params = {}

	return fetch.delete(path, { params })
}

/**
 * 获取 CSV 数据导出链接
 * @param {string} whCode
 * @param {Number} year 年度
 */
const getExportCsvLink = function(whCode, year) {
	return `${fetch.baseURL}api/YearTotalAccount/exportCsv/${whCode}/${year}`
}

export default {
	pageOptions:pages.pageOptions,
	getTotalAccounts,
	buildTotalAccount,
	clearTotalAccounts,
	getFullYear,
	createFullYear,
	getExportCsvLink
}
