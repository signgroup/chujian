Page({
  data: {
    grids: [{
      image: "http://13s.top/weimage/01.gif",
      //bindtap:"getMap"
      url: "map/map",
      },
      {
        image: "http://13s.top/weimage/02.gif"
       
      },
      {
        image: "http://13s.top/weimage/03.gif"
      },
      {
        image: "http://13s.top/weimage/04.gif"
      },
      {
        image: "http://13s.top/weimage/05.png",
        url: "recipes/index",
      },
      {
        image: "http://13s.top/weimage/06.gif"
      },
      {
        image: "http://13s.top/weimage/07.gif"
      },
      {
        image: "http://13s.top/weimage/08.gif"
      },
      {
        image: "http://13s.top/weimage/09.gif"
      },
    ],
    imgUrls: [
      'http://13s.top/weimage/swiper_banner1.png',
      'http://13s.top/weimage/swiper_banner2.png',
      'http://13s.top/weimage/swiper_banner3.png',
      'http://13s.top/weimage/swiper_banner4.png',
      'http://13s.top/weimage/swiper_banner5.png',
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    inputShowed: false,
    inputVal: "",
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.loadInfo();
  },
  //获取当前位置的经纬度
  loadInfo: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      altitude: true,
      success: function (res) {
        console.log(res)
        var latitude = res.latitude //维度
        var longitude = res.longitude //经度
        let location = {
          latitude: res.latitude, //维度
          longitude: res.longitude //经度
        }
        wx.setStorage({
          key: "location",
          data: location
        })
      }
    })
  },
  getMap(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        // wx.openLocation({
        //   latitude: latitude,
        //   longitude: longitude,
        //   scale: 28
        // })
        wx.getLocation();
      }
    })
  }
  
});