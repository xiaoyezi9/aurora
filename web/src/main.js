/*
 * @Author: 爱吃香菜的猹
 * @Date: 2023-05-22 20:01:28
 * @LastEditors: 爱吃香菜的猹
 * @LastEditTime: 2023-06-14 17:08:08
 * @FilePath: \aurora-beta\web\src\main.js
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/blue-skin5152.css'
import './assets/css/bootstrap5152.css'
import './assets/css/green-skin5152.css'
import './assets/css/main5152.css'
import './assets/css/red-skin5152.css'
import './assets/css/responsive5152.css'
import './plugins/element.js'
import ElementUI from 'element-ui';
import './assets/css/ali.css'
//统一接口api
import * as API from './api'

//ecahrs
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import  lazyPlugin  from './directives'

Vue.component('chart', ECharts)
//vuex
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)
//导入时间插件
import moment from 'moment';
//在main.js 页面里添加自定义指令//
Vue.directive('title', {//单个修改标题
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

//定义全局时间过滤器
Vue.filter('dataFormat', function (datastr, pattern = "YYYY-MM-DD HH:mm") {
  return moment(datastr).format(pattern)
})
//加载懒加载插件
Vue.use(lazyPlugin)
Vue.config.productionTip = false


Vue.prototype.$API = API;
//为post请求设置默认请求头
//vue2中使用axios，我们请求的参数仍为json类型，是并没有序列化的。我们需要使用querystring解决该问题
import qs from 'qs';
Vue.prototype.qs = qs;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
