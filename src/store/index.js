import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    // payload 新添加的商品
    addCart(state, payload) {   
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      // 查找数组中是否有相同的商品
      if (oldProduct) {
        oldProduct.count ++
      } else {
        payload.count = 1
        state.cartList.push(payload);
      }
    }
  },
  actions: {},
  modules: {},
});
