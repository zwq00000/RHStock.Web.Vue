'use strict'
import fetch from './fetch.js'

const getCustomers = function(year, options) {
	let path = `/api/customer/${year}`
	return fetch.get(path, { params: fetch.toPageParams(options) })
}

export default {
	getCustomers,
	pageOptions: fetch.pageOptions
}
