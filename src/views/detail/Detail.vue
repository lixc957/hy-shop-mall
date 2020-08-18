<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

import {getDetail,Goods} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  created() {
    this.iid = this.$route.params.iid

    //请求商品数据
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result

      //1.获取顶部轮播图信息
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  }
}
</script>

<style scoped>

</style>