import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //1.监听图片数据加载完成
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imgLoad',this.itemImgListener)
  },
}