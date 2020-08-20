import {debounce} from './utils'
import BackTop from 'content/BackTop'

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

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    }
  },
}