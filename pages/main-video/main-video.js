import {
  getTopMV
} from '../../services/video'

Page({

  data: {
    videoList: [],
    offset: 0,
    hasMore: true,
  },

  onLoad() {
    //发送网络请求
    this.fetchTopMv()
  },

  //发送网络请求的方法
  async fetchTopMv() {
    const res = await getTopMV(this.data.offset)
    const newVideoList = [...this.data.videoList, ...res.data]
    this.setData({
      videoList: newVideoList
    })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },

  //监听上拉下拉加载数据
  onReachBottom() {
    if (!this.data.hasMore) return
    this.fetchTopMv()
  },
  async onPullDownRefresh() {
    this.data.videoList = []
    this.data.offset = 0
    this.data.hasMore = true

    await this.fetchTopMv()
    wx.stopPullDownRefresh()
  },

  //事件监听

})