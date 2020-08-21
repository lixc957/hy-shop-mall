<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapGetters({
      cartCount: 'cartCount'
    })
  }
}
</script>

<style scoped>
.nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    text-align: center;
  }
</style>