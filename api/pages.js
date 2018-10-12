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
	sortBy: '',
	//是否 逆序 排序
	descending: null,

	mergeResult: function(result) {
		mergeResult(this, result)
	},
	toParams: function() {
		return toParams(this)
	}
}

/**
 * 合并查询结果
 * @param {*} pageOptions
 * @param {pageResult} result
 */
const mergeResult = function(options, result) {
	options.page = result.page || 1
	options.pageSize = result.pageSize
	options.pages = result.pages || 0
	options.total = result.total
}

const mergePageination = function(pagination,result){
	pagination.page = result.page
	pagination.rowsPerPage = result.pageSize
	pagination.totalItems = result.total
	pagination.pages = result.pages
}

const toPagination = function(result){
	return {
		page : result.page,
		rowsPerPage : result.pageSize,
		totalItems : result.total,
		pages : result.pages
	}
}

const toParams = function(options) {
	if (options) {
		return {
			params: {
				page: options.page || 1,
				pageSize: options.pageSize || 20,
				searchKey: options.searchKey,
				sortBy: options.sortBy,
				descending: options.descending
			}
		}
	} else {
		return { params: pageOptions }
	}
}

export default {
	pageOptions,
	toParams,
	mergeResult,
	toPagination,
	mergePageination
}
