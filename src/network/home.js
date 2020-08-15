import {axios} from './axios'

//1.轮播图数据请求
export function getHomeMultidata() {
  return axios({
    url: '/home/multidata'
  })
}

//2.商品请求
export function getHomeGoods(type,page) {
  return axios({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}