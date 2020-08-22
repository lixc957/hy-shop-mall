<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //1.创建滚动对象实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,   //是否实时监听滚动位置,3 为实时监听,0 1不监听
      pullUpLoad: this.pullUpLoad, //是否监听滚动到底部的上拉事件
      click: true
    })

    //2.监听滚动位置,probeType 参数为2 or 3 时触发
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }

    //3.监听上拉事件,pullUpLoad 参数为 true 时触发
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    //上拉数据加载完毕，调用此方法告诉 better-scroll 数据加载完成
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    //重新计算 better-scroll
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    //记录路由离开时的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
}
</script>

<style scoped>
</style>