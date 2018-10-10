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
	pageOptions,
	toPageParams
}