<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">   
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>  
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'common/scroll/Scroll'

import {getDetail,Goods,Shop,ParamInfo} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
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

      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //4.获取商品详情数据
      this.detailInfo = data.detailInfo

      //5.获取商品参数信息
      this.paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule)
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  .detail {
    position: relative;
    height: 100vh;
    z-index: 2;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 2;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>