<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 52px;
    width: 43px;
    height: 43px;
    z-index: 1;
  }

  .back-top img {
    width: 100%;
    vertical-align: middle;
  }
</style>