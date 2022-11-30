import {
  ADRequest
} from './index'

export function getSongDetail(ids) {
  return ADRequest.get({
    url: '/song/detail',
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return ADRequest.get({
    url: '/lyric',
    data: {
      id
    }
  })
}