<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isFixed"
      class="tab-control"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @imgLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'common/navbar/NavBar'
import Scroll from 'common/scroll/Scroll'
import TabControl from 'content/TabControl'
import GoodList from 'content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { itemListenerMixin, backTopMixin } from '@/common/mixin'

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isFixed: false,
      tabOffsetTop: 0,
      saveY: 0,
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodList
  },
  created() {
    //1.轮播图数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  methods: {
    /*
     * 事件监听相关的方法 
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.判断 backTop 是否显示
      this.isShowBackTop = (- position.y) > 800

      //2.判断 tabControl 是否吸顶
      this.isFixed = (- position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
     * 网络请求相关的方法 
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    //1.保存滚动的y值
    this.saveY = this.$refs.scroll.getScrollY()

    //2.取消全局事件监听
    this.$bus.$off('imgLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
#home {
  background-color: #fff;
  position: relative;
  height: 100vh;
}

.tab-control {
  position: relative;
  z-index: 1;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  text-align: center;
  z-index: 1;
}
</style>