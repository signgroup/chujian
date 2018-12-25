const openIdUrl = require('./config');

App({
  data: {
    apiHost: "https://apicloud.mob.com/"
  },
  onLaunch: function() {
    //console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
    console.log(openIdUrl.downloadExampleUrl)
  },
  onHide: function() {
    //console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  },
  /**
   * 接口公共访问方法
   * @param {Object} urlPath 访问路径
   * @param {Object} params 访问参数（json格式）
   * @param {Object} requestCode 访问码，返回处理使用
   * @param {Object} onSuccess 成功回调
   * @param {Object} onErrorBefore 失败回调
   * @param {Object} onComplete 请求完成（不管成功或失败）回调
   * @param {Object} isVerify 是否验证重复提交
   * @param {Object} requestType 请求类型（默认POST）
   * @param {Object} retry 访问失败重新请求次数（默认1次）
   */
  webCall: function (urlPath, params, requestType, onSuccess, onError) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: that.data.apiHost + urlPath,
      data: params,
      method: requestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      dataType:"json",
      header: {
        'content-type': requestType == 'POST' ?
          'application/x-www-form-urlencoded' : 'application/json'
      }, // 设置请求的 header
      complete() { //请求结束后隐藏 loading 提示框
        wx.hideLoading();
      },
      success: function(res) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        onSuccess(res.data)
        
      },
      fail: function(res) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      },
    })
  }
});