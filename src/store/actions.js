import { ADD_COUNTER, ADD_TO_CART } from './mutation_types'

export default {
  // payload 新添加的商品
  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      let oldProduct = context.state.cartList.find(
        (item) => item.iid === payload.iid
      )
      // 查找数组中是否有相同的商品
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        reslove('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        reslove('添加商品成功')
      }
    })
  },
}
