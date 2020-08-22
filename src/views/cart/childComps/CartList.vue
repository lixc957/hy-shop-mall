<template>
  <div class="cart-list">
    <cart-list-item 
      v-for="(item, index) in cartList"
      :key="index"
      :product="item" />
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters({
      cartList: 'cartList'
    })
  },
}
</script>

<style scoped>

</style>