<template>
  <div class="goods">
    <good-item v-for="(item, index) in goods" :key="index" :good-item="item"/>
  </div>
</template>

<script>
import GoodItem from './GoodsItem'

export default {
  data() {
    return {

    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>