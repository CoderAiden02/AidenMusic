import recommendStore from '../../store/recommendStore'
import {
  rankingStore
} from '../../store/rankingStore'
import playerStore from '../../store/playerStore'
import {
  getPlayListDetail
} from '../../services/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'ranking',
    key: 'newRanking',
    songInfo: {},
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type
    this.setData({
      type
    })
    if (type === 'ranking') {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === 'recommend') {
      recommendStore.onState("recommendSongInfo", this.handleRanking)
    } else if (type === 'menu') {
      const id = options.id
      this.data.id = id
      this.fetchMenuInfo()
    }
  },

  async fetchMenuInfo() {
    const res = await getPlayListDetail(this.data.id)
    this.setData({
      songInfo: res.playlist
    })
  },

  onSongItemTap(e) {
    const index = e.currentTarget.dataset.index
    playerStore.setState('playSongList', this.data.songInfo.tracks)
    playerStore.setState('playSongIndex', index)
  },


  handleRanking(value) {
    this.setData({
      songInfo: value
    })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },

  onUnload() {
    if (this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.handleRanking)
    } else if (this.data.type === 'recommend') {
      recommendStore.offState('recommendSongInfo', this.handleRanking)
    }
  }
})