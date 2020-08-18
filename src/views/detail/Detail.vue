<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'

import {getDetail} from 'network/detail'

export default {
  data() {
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.params.iid

    //请求商品数据
    getDetail(this.iid).then(res => {
      console.log(res)
    })
  },
  components: {
    DetailNavBar
  }
}
</script>

<style scoped>

</style>