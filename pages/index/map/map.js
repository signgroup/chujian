Page({
  data: {
    latitude: 29.8172,
    longitude: 121.547,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../../images/location-control.png',
      position: {
        left: 0,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }],
    shareData: {
      title: '看看大家都在哪',
      desc: '快来定位吧',
      path: "pages/index/map/map",
    }
  },
  onShareAppMessage() {
    return this.data.shareData
  },
  onReady: function(e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function() {
    if (!wx.getStorageSync('wxUserInfo').openid) {
      // 跳转到tabBar页面（在app.json中注册过的tabBar页面），同时关闭其他非tabBar页面。
      wx.switchTab({
        url: '../../mine/index'
      })
    } else {
      let that = this
      //this.getMapData();
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: (res) => {
          console.log(res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
          //this.insertUserLocation(res,u);

          let u = wx.getStorageSync("wxUserInfo");
          console.log(u.openid)
          if (u.openid) {
            wx.request({
              // 通过此 url ，获取 openid 与 unionid
              url: 'https://13s.top/other/wx/getopenid.php',
              data: {
                openid: u.openid
              },
              method: "get",
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              }, // 设置请求的 header
              success: resopenid => {
                console.log(resopenid)
                if (!resopenid.data.length) {
                  console.log(2)
                  this.insertUserLocation(res, u);
                } else {
                  console.log(1)
                  this.updateUserLocation(resopenid, u);
                }
              },
              fail: res => {
                //this.onErrorBefore(res);
              }
            });
          }



          let latitude = res.latitude;
          let longitude = res.longitude;
          let marker = this.createMarker(res);
          wx.request({
            // 通过此 url ，获取 openid 与 unionid
            url: 'https://13s.top/other/wx/getList.php',
            data: {},
            method: "get",
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            }, // 设置请求的 header
            success: res => {
              let markers = [];
              for (let item of res.data.data) {
                let marker = that.createMarker(item);
                markers.push(marker)
              }
              console.log(markers)
              that.setData({
                centerX: longitude,
                centerY: latitude,
                markers: markers
              })
            },
            fail: res => {
              //this.onErrorBefore(res);
            }
          });
        }
      });
    }
  },
  onShow() {
    console.log(this.globalData)
  },
  //修改信息
  updateUserLocation(res, u) {
    console.log(res)
    var data = {
      id: res.data[0].id,
      avatarUrl: u.avatarUrl,
      city: u.city,
      country: u.country,
      nickName: u.nickName,
      LANGUAGE: u.LANGUAGE,
      province: u.province,
      gender: u.gender,
      openid: u.openid,
      session_key: u.session_key,
      latitude: res.data[0].latitude,
      longitude: res.data[0].longitude
    }
    console.log(data)
    wx.request({
      // 通过此 url ，获取 openid 与 unionid
      url: 'https://13s.top/other/wx/update.php',
      data: data,
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      }, // 设置请求的 header
      success: res => {
        console.log(res)
      },
      fail: res => {
        //this.onErrorBefore(res);
      }
    });
  },

  //添加信息
  insertUserLocation(res, u) {
    console.log(res)
    wx.request({
      // 通过此 url ，获取 openid 与 unionid
      url: 'https://13s.top/other/wx/create.php',
      data: {
        avatarUrl: u.avatarUrl,
        city: u.city,
        country: u.country,
        nickName: u.nickName,
        LANGUAGE: u.LANGUAGE,
        province: u.province,
        gender: u.gender,
        openid: u.openid,
        session_key: u.session_key,
        latitude: res.latitude,
        longitude: res.longitude
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      }, // 设置请求的 header
      success: res => {
        console.log(res)
      },
      fail: res => {
        //this.onErrorBefore(res);
      }
    });

  },
  getCenterLocation: function(e) {

    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res)
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: point.avatarUrl ? point.avatarUrl : '../../../images/default.png',
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 50,
      height: 50,
      callout: {
        content: point.nickName ? point.nickName : "",
        color: '#FFFFFF',
        fontSize: 10,
        borderRadius: 10,
        bgColor: '#F44336',
        padding: 5,
        display: 'BYCLICK', //'BYCLICK':点击显示; 'ALWAYS':常显
      }
    };
    //console.log(marker)
    return marker;
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  // includePoints: function() {
  //   this.mapCtx.includePoints({
  //     padding: [10],
  //     points: [{
  //       latitude:23.10229,
  //       longitude:113.3345211,
  //     }, {
  //       latitude:23.00229,
  //       longitude:113.3345211,
  //     }]
  //   })
  // }
})