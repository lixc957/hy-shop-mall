<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" 
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles="['流行','新款','精选']"
        class="tab-control"
        @tabClick="tabClick"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
import BackTop from 'content/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0,list: []},
        new: {page: 0,list: []},
        sell: {page: 0,list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  components: { 
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodList,
    BackTop
  },
  created() {
    //1.轮播图数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    //1.监听图片数据加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh,300)
    this.$bus.$on('imgLoad',() => {
      refresh()
    })
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
    //封装防抖函数
    debounce(fn,delay) {
      let timer = null
      return function(...rest) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this,rest)
        },delay)
      }
    },
    tabClick(index) {
      switch(index) {
        case 0 : 
          this.currentType = 'pop'
          break;
        case 1 : 
          this.currentType = 'new'
          break;
        case 2 : 
          this.currentType = 'sell'
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      this.isShowBackTop = (- position.y) > 800
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
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
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp() 
      })
    }
  },
}
</script>

<style scoped>
  #home {
    background-color: #fff;
    position: relative;
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    text-align: center;
    z-index: 1;
  }

  .tab-control {
    position: sticky;
    top: 43px;
    z-index: 1;
  }
</style>