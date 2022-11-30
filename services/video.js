import {
  ADRequest
} from './index'

export function getTopMV(offset = 0, limit = 20) {
  return ADRequest.get({
    url: '/top/mv',
    data: {
      limit,
      offset
    }
  })
}

export function getMvUrl(id) {
  return ADRequest.get({
    url: '/mv/url',
    data: {
      id
    }
  })
}

export function getMvInfo(mvid) {
  return ADRequest.get({
    url: '/mv/detail',
    data: {
      mvid
    }
  })
}

export function getMvRelated(id) {
  return ADRequest.get({
    url: '/related/allvideo',
    data: {
      id
    }
  })
}