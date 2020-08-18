<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    this.iid = this.$route.params.iid

    //请求商品数据
    getDetail(this.iid).then(res => {
      console.log(res)
      this.topImages = res.result.itemInfo.topImages
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper
  }
}
</script>

<style scoped>

</style>