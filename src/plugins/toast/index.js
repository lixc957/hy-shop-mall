import Toast from './Toast'

export default {
  install(Vue) {
    // 1. 创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2. new 一个组件对象
    const toast = new toastConstructor()

    // 3. 手动挂载某一盒子上
    toast.$mount(document.createElement('div'))

    // 4. toast.$el 对应的就是 div
    document.body.appendChild(toast.$el)

    // 5. 原型上添加属性
    Vue.prototype.$toast = toast
  }
}