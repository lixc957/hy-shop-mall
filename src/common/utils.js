//封装防抖函数
export function debounce(fn,delay) {
  let timer = null
  return function(...rest) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this,rest)
    },delay)
  }
}