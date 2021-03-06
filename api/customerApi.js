import fetch from './fetch.js'
import pages from './pages'

const getCustomers = function(year, options) {
	let path = `/api/customer/${year}`
	return fetch.get(path, pages.toParams(options))
}

export default {
	getCustomers
}
