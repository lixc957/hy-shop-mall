<template>
  <div class="wrapper" ref="wrapper">
    <div class="contert">
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
  props:{
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    //1.创建滚动对象实例
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click: true
    })

    //2.监听滚动位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
  },
  methods: {
    scrollTo(x,y,time = 300) {
      this.scroll.scrollTo(x,y,time)
    }
  },
}
</script>

<style scoped>

</style>