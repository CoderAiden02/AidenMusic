import {
  ADRequest
} from './index'

export function getMusicBanner(type = 0) {
  return ADRequest.get({
    url: '/banner',
    data: {
      type
    }
  })
}
export function getPlayListDetail(id) {
  return ADRequest.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}

export function getSongMenuList(cat = '全部', limit = 6, offset = 0) {
  return ADRequest.get({
    url: '/top/playlist',
    data: {
      cat,
      limit,
      offset
    }
  })
}

export function getSongMenuTag() {
  return ADRequest.get({
    url: "/playlist/hot"
  })
}