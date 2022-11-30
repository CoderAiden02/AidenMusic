// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    statusHeight: 20,
    contentHeight:300
  },
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.screenHeight = res.screenHeight
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.statusBarHeight
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
      }
    })
  }
})