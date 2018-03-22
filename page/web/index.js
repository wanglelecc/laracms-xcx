const articleUrl = require('../../config').articleUrl
const duration = 2000


Page({

  data : {
    data : [],
    page : 1,
    loading:false,
    noData:false
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.requestArticle()
  },

  // 请求数据
  requestArticle : function(){
    var self = this

    self.setData({
      loading: true
    })

    wx.request({
      method: 'GET',
      url: articleUrl,
      data: {
        page: self.data.page,
        noncestr: Date.now()
      },
      success: function (result) {
        // wx.showToast({
        //   title: '请求成功',
        //   icon: 'success',
        //   mask: true,
        //   duration: duration
        // })
        self.setData({
          loading: false
        })

        if (result.statusCode == 200) {

          var tmpData = self.data.data
          for (var i = 0; i < result.data.data.length; i++){
            tmpData.push(result.data.data[i])
          }
          
          self.setData({
            data: tmpData
          })

          if ( self.data.page < result.data.meta.pagination.total_pages ){
            self.setData({
              data: self.data.page + 1,
              noData : false
            })
          }else{
            self.setData({
              noData:true
            })
          }
        }
        console.log('request success', result)
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      data:[],
      page:1
    })
    this.requestArticle()
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'loading'
    // });
    // console.log('onPullDownRefresh', new Date())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.noData == false){
      this.requestArticle()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
