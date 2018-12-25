//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: {}
  },

  onLoad: function() {
    this.getDataList();
  },
  getDataList: function(e) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://apicloud.mob.com/oil/price/province/query?key=27c4919c4f201',
      method: 'get',
      data: {},
      dataType: "json",
      header: {
        'Accept': 'application/json'
      },
      complete() { //请求结束后隐藏 loading 提示框
        wx.hideLoading();
      },
      success: res => {
        wx.hideLoading();
        console.log(res.data.result)
        this.setData({
          items: res.data.result
        })
      },
      fail: function() {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })
  }
})