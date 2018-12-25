Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: 0,
    curIndex: 0,
    navTitle: ''
  },
  onLoad: function(options) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: 'https://apicloud.mob.com/v1/cook/category/query?key=27c4919c4f201',
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
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        var itemData = res.data.result.childs;
        var itemList = [];
        for (var i in itemData) {
          itemList.push((itemData[i].categoryInfo.name).substring(1, 3) + (itemData[i].categoryInfo.name).substring(5, 7))
        }
        console.log(itemList)
        this.setData({
          navLeftItems: itemList,
          navRightItems: itemData,
        })
      },
      fail: function(e) {
        console.log(e)
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

  },
  // 左侧按钮

  left: function(e) {

    var that = this;

    var index = e.currentTarget.dataset.index;

    console.log(index, "左侧按钮")

    that.setData({

      curNav: index,

      curIndex: index,

    })

  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: "全部菜谱"
    })
  }
})