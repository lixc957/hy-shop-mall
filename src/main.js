import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装 toast 插件
Vue.use(toast)
// 解决移动端点击300ms延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
