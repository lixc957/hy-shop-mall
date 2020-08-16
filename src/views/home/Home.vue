<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control
      :titles="['流行','新款','精选']"
      class="tab-control"
      @tabClick="tabClick"/>
    <good-list :goods="showGoods"/>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
    </ul>
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'common/navbar/NavBar'
import TabControl from 'content/TabControl'
import GoodList from 'content/goods/GoodsList'

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
      currentType: 'pop'
    }
  },
  components: { 
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
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
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /*
     * 事件监听相关的方法 
     */
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
      })
    }
  },
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    background-color: #fff;
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