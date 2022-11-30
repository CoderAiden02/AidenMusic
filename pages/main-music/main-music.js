import {
  getMusicBanner,
  getSongMenuList
} from '../../services/music'
import recommendStore from '../../store/recommendStore'
import {
  rankingStore,
  rankingsMap
} from '../../store/rankingStore'
import playerStore from '../../store/playerStore'
import {
  querySelect
} from '../../utils/query-select'
import Adthrottle from '../../utils/throttle.js'
const querySelectThrottle = Adthrottle(querySelect, 100)
Page({
  data: {
    searchValue: "",
    banners: [],
    bannerHeight: 0,
    recommendSongs: [],
    //歌单数据
    hotMenuList: [],
    recMenuList: [],
    //巅峰榜数据
    isRankingData: false,
    rankingInfos: {},
    // 当前正在播放的歌曲信息
    currentSong: {},
    isPlaying: false,
    popShow: false
  },

  onLoad() {
    this.fetchMusicBanners()

    recommendStore.onState('recommendSongInfo', this.handleRecommendSongs)
    recommendStore.dispatch('fetchRecommendSongsAction')
    for (const key in rankingsMap) {
      rankingStore.onState(key, this.getHandleRanking(key))
    }
    rankingStore.dispatch('fetchRankingDataAction')
    playerStore.onStates(["currentSong", "isPlaying"], this.handlePlayInfos)
    this.fetchSongMenuList()
  },

  async fetchMusicBanners() {
    const res = await getMusicBanner()
    this.setData({
      banners: res.banners
    })
  },
  fetchSongMenuList() {
    getSongMenuList().then(res => {
      this.setData({
        hotMenuList: res.playlists
      })
    })
    getSongMenuList('华语').then(res => {
      this.setData({
        recMenuList: res.playlists
      })
    })

  },

  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  async onBannerImageLoad() {
    const res = await querySelectThrottle(".banner-image")
    this.setData({
      bannerHeight: res[0].height
    })
  },
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },

  onSongItemTap(e) {
    const index = e.currentTarget.dataset.index
    playerStore.setState('playSongList', this.data.recommendSongs)
    playerStore.setState('playSongIndex', index)
  },

  onPlayOrPauseBtnTap() {
    playerStore.dispatch("changeMusicStatusAction")
  },

  onPlayBarAlbumTap() {
    wx.navigateTo({
      url: '/packagePlayer/pages/music-player/music-player',
    })
  },

  onListBtnTap() {
    this.setData({
      popShow: true
    })
  },
  onPopClose() {
    this.setData({
      popShow: false
    })
  },
  //==================从store中获取数据=============
  handleRecommendSongs(value) {
    if (!value.tracks) return
    this.setData({
      recommendSongs: value.tracks.slice(0, 6)
    })
  },

  getHandleRanking(key) {
    return value => {
      if (!value.name) return
      this.setData({
        isRankingData: true
      })
      const newRankingInfos = {
        ...this.data.rankingInfos,
        [key]: value
      }
      this.setData({
        rankingInfos: newRankingInfos
      })
    }
  },

  handlePlayInfos({
    currentSong,
    isPlaying
  }) {
    if (currentSong) {
      this.setData({
        currentSong
      })
    }
    if (isPlaying !== undefined) {
      this.setData({
        isPlaying
      })
    }
  },

  onUnload() {
    recommendStore.offState('recommendSongs', this.handleRecommendSongs)
    for (const key in rankingsMap) {
      rankingStore.offState(key, this.getHandleRanking(key))
    }
    playerStore.offStates(["currentSong", "isPlaying"], this.handlePlayInfos)
  }

})