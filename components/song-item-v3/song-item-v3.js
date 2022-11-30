import playerStore from '../../store/playerStore'
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    }
  },
  methods: {
    onSongItemTap() {
      const id = this.properties.itemData.id
      playerStore.dispatch('playMusicWithSongIdAction', id)
    }
  }
})