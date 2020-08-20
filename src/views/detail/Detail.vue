<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="goodsImgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comments" :comment-info="commentInfo" />
      <goods-list ref="recommends" :goods="recommends" />
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
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'content/goods/GoodsList'

import Scroll from 'common/scroll/Scroll'

import { getDetail, Goods, Shop, ParamInfo, getRecommend } from 'network/detail'
import { itemListenerMixin } from '@/common/mixin'
import { debounce } from '@/common/utils'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      commentsOffsetTop: null
    }
  },
  created() {
    //1.获取商品id
    this.iid = this.$route.params.iid

    //2.请求商品数据
    getDetail(this.iid).then(res => {
      const data = res.result

      //1.获取顶部轮播图信息
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //4.获取商品详情数据
      this.detailInfo = data.detailInfo

      //5.获取商品参数信息
      this.paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //4.给
    this.getThemeTopY =  debounce(() => {
      this.themeTopYs = []
      //判断是否有评论
      this.comments = (this.$refs.comments.$el.offsetTop - 44) || (this.$refs.recommends.$el.offsetTop - 44)
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.comments)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44)
    },200)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  methods: {
    goodsImgLoad() {
      //1.图片加载完重新计算高度
      this.$refs.scroll.refresh()
      //2.
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, - this.themeTopYs[index], 200)
    }
  },
  mixins: [itemListenerMixin],
  mounted() {
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.itemImgListener)
  },
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