// components/video-item/video-item.js
import playerStore from '../../store/playerStore'
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onClick() {
      playerStore.dispatch('changeMusicStatusAction', false, true)
      const item = this.properties.itemData
      wx.navigateTo({
        url: `/packageVideo/pages/detail-video/detail-video?id=${item.id}`,
      })
    }
  }
})