import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/loading.gif')
})