import {
  getMvUrl,
  getMvInfo,
  getMvRelated
} from '../../../services/video'
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    id: 0,
    videoUrl: '',
    videoInfo: '',
    relatedVideo: [],
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.fetchMvUrl()
    this.fetchMvInfo()
    this.fetchMvRelated()
  },

  async fetchMvUrl() {
    const res = await getMvUrl(this.data.id)
    this.setData({
      videoUrl: res.data.url
    })
  },
  async fetchMvInfo() {
    const res = await getMvInfo(this.data.id)
    this.setData({
      videoInfo: res.data
    })
  },
  async fetchMvRelated() {
    const res = await getMvRelated(this.data.id)
    this.setData({
      relatedVideo: res.data
    })

  },

  onRelatedClick() {
    Toast('没有做跳转,但是一般都是打开APP');
  }

})