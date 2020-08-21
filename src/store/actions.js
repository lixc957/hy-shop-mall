import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation_types'

export default {
  // payload 新添加的商品
  addCart(context, payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 查找数组中是否有相同的商品
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}