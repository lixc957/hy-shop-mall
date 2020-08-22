<template>
  <div class="cart-list-item">
    {{ product }}
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
</style>