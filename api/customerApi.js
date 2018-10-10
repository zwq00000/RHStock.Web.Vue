'use strict'
import fetch from './fetch.js'
import pages from './pages'

const getCustomers = function(year, options) {
	let path = `/api/customer/${year}`
	return fetch.get(path, { params: pages.toPageParams(options) })
}

export default {
	getCustomers,
	pageOptions: pages.pageOptions
}
