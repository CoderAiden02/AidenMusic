// components/popup-list/popup-list.js
import playerStore from '../../../store/playerStore'
const modeNames = ["order", "repeat", "random"]
Component({

  properties: {
    popShow: {
      type: Boolean,
      value: false
    }
  },

  data: {
    playModeName: 'order',
    playSongList: []
  },

  methods: {
    onPopClose() {
      this.triggerEvent('pop-close')
    },
    onModeBtnTap() {
      playerStore.dispatch("changePlayModeAction")
    }
  },
  lifetimes: {
    attached() {
      playerStore.onStates(['playSongList', 'playModeIndex'], ({
        playSongList,
        playModeIndex
      }) => {
        if (playSongList) {
          this.setData({
            playSongList
          })
        }
        if (playModeIndex !== undefined) {
          this.setData({
            playModeName: modeNames[playModeIndex]
          })
        }
      })
    },
    detached() {
      playerStore.offStates(['playSongList', 'playModeIndex'], ({
        playSongList,
        playModeIndex
      }) => {
        if (playSongList) {
          this.setData({
            playSongList
          })
        }
        if (playModeIndex !== undefined) {
          this.setData({
            playModeName: modeNames[playModeIndex]
          })
        }
      })
    }
  }
})