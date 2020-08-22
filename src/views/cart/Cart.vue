<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <scroll class="cart-content">
      <cart-list />
    </scroll>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import CartList from './childComps/CartList'

import Scroll from 'common/scroll/Scroll'

import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  components: {
    NavBar,
    CartList,
    Scroll,
  },
  computed: {
    ...mapGetters({
      cartCount: 'cartCount'
    })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  text-align: center;
}

.cart-content {
  height: calc(100% - 44px - 49px);
}
</style>