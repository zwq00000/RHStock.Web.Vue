'use strict';
import fetch from './fetch.js';

/**
 * 获取 可用账套年度
 */
const years = function() {
    return fetch.get('/api/accsuit/years');
};

export default { years };
