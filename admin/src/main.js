import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
//统一接口api
import * as API from './api'
import ElementUI from 'element-ui';

//ecahrs
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import BreadCrumb from "@/components/BreadCrumb.vue";
import Search from "@/components/Search.vue";
Vue.component('chart', ECharts)
Vue.component('BreadCrumb',BreadCrumb )
Vue.component('Search',Search )

import './assets/css/ali.css'
//粒子特效   npm install vue-particles --save-dev 
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  
//vuex
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)
//导入时间插件
import moment from 'moment';
//定义全局时间过滤器
Vue.filter('dataFormat', function (datastr, pattern = "YYYY-MM-DD HH:mm") {
  return moment(datastr).format(pattern)
})
Vue.config.productionTip = false
Vue.prototype.$API=API
//vue2中使用axios，我们请求的参数仍为json类型，是并没有序列化的。我们需要使用querystring解决该问题
import qs from 'qs';
Vue.prototype.qs = qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
