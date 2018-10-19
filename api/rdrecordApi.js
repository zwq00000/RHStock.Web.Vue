
import pages from './pages.js'

/**
 * 获取 库存单据列表
 * @param {int} year            账套年度
 * @param {int} month           月份 1~12
 * @param {string} whCode       仓库代码
 * @param {pageOptions} options 分页参数
 */
const getVouchsByMonth = function(year,month,whCode,options){
    let url = `/api/RdRecord/${whCode}/${year}/${month}`
    return $nuxt.$axios.get(url, pages.toParams(options))
}

/**
 * 获取 库存单据列表
 * @param {int} year            账套年度
 * @param {int} month           月份 1~12
 * @param {string} whCode       仓库代码
 * @param {pageOptions} options 分页参数
 */
const getVouchs = function(year,whCode,options){
    let url = `/api/RdRecord/${whCode}/${year}`
    return $nuxt.$axios.get(url, pages.toParams(options))
}


/**
 * 获取单据明细
 * @param {int} year            账套年度
 * @param {string} vouchCode    单据编号
 */
const getVouch = function(year,vouchCode){
    return $nuxt.$axios.get(`/api/RdRecord/${year}/${vouchCode}`)
}

export default {
    getVouchsByMonth,
    getVouchs,
    getVouch
}