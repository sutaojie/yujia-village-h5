/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App.vue'
import request from '@/utils/request'
import router from '@/router/index'
import store from '@/store'

import '@/plugins/index.js'
import '@/vendor/style.js'


Vue.config.productionTip = false
// 注册工具库至 Vue 原型
Object.defineProperty(Vue.prototype, '$request', { value: request });

var vue = new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
export default vue
