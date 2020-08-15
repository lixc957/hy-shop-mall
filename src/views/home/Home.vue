<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-views :recommends="recommends"></recommend-views>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendViews from './childComps/RecommendViews'
import {getHomeMultidata} from 'network/home'

export default {
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendViews
  },
  created() {
    //轮播图数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    text-align: center;
  }
</style>