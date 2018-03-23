var app = getApp()
Page({
  data: {
    hasUserInfo: false
  },

  onLoad: function () {
    this.getUserInfo();
  },

  getUserInfo: function () {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          that.update()
          console.log(res.userInfo)
        }
      })
    }
  },
  clear: function () {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  }
})