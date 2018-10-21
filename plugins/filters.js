import Vue from 'vue'
import moment from 'moment'

 const dateFormat = function(date) {
    if (!date) {
        return "";
    }
    return moment(date).format("MM-DD");
}

const fullDate = function(date) {
    if (!date) {
        return "";
    }
    return moment(date).format("YYYY-MM-DD");
}

Vue.filter('dateFormat',dateFormat)
Vue.filter('fullDate',fullDate)