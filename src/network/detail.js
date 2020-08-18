import {axios} from './axios'

export function getDetail(iid) {
  return axios({
    url: '/detail',
    params: {
      iid
    }
  })
}