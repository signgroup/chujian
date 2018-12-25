Page({
  config: {
    navigationBarTitleText: "商品分类",
    disableScroll: true,
    backgroundColor: "#fff"
  },

  data: {
    getAllList: [],
    isGetAllList: false,
    scrollHeight: 0,
    page: 1,
    size: 20,
    options: {},
    isEmpty: true,
    isNotData: false,
    imageUrl: "../../../images/image.png",
    inputVal: "",
    floorstatus:false,
    scrollTop:0

  },

  onLoad: function(options) {
    this.setData({
      options: options

    });
    this.getRecListData(options, this.data.page)
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchInput:function(e){
    this.data.getAllList=[];
    this.getRecListData("", 1, this.data.inputVal) 
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  returnTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
        floorstatus: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  getRecListData(options,page, name) {
    
    var cid = options.id ? options.id:"";
    var cname = name ? name : "";
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    let url = 'https://apicloud.mob.com/v1/cook/menu/search?key=27c4919c4f201';
    wx.request({
      url: url,
      method: 'get',
      data: {
        cid: cid,
        name: cname,
        page: page,
        size: that.data.size
      },
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
        console.log(res)
        var rs = res.data.result.list;
        var totalList = [];
        if (!that.data.isEmpty) {
          //非第一次进入
          totalList = that.data.getAllList.concat(rs);
        } else {
          // 第一次进入
          that.data.isEmpty = false;
          totalList = rs;
        }
        console.log(totalList)
        if (rs.length < this.data.size) {
          this.setData({
            getAllList: totalList,
            isGetAllList:false,
            isNotData: true,
          });
        } else {
          this.setData({
            getAllList: totalList,
            isGetAllList: true,
            isNotData:false,
          });
        }

        that.data.page++;

      },
      fail: function() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        this.setData({
          isGetAllList: false,
        });
        return typeof cb == "function" && cb(false)
      },
    })
  },
  /*
    页面上拉触底事件的处理函数
    */
  onReachBottom: function() {
    this.getRecListData(this.data.options, this.data.page,"");
  },
  /*
   *生命周期回调—监听页面初次渲染完成
   *需要window 开启enablePullDownRefresh 下拉刷新
   */
  onPullDownRefresh: function() {
    this.data.getAllList = [];
    this.getRecListData(this.data.options, 1,"")
  },
  //生命周期函数-监听页面初次渲染完成 在onLoad执行
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '菜谱列表'
    })
  },

})