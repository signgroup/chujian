//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
    session_key: '',
    networkType:'',
    systemInfo:{},

  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function(options) {
    let that = this;
    //实时监听网络状态变化。
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
      that.setData({
        networkType:res.networkType
      })
    });
    //获取网络状态
    wx.getNetworkType({
      success: function(res) {
        console.log(res.networkType)
        that.setData({
          networkType: res.networkType
        })
      }
    });
    //获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          systemInfo:res
        })
      },
    });
    

  },
  //震动
  vibrateLong() {
    wx.vibrateLong({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
      complete() {
        console.log('completed')
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.login({
      success: res => {
        // 微信临时登录凭证
        let _code = res.code;
        // 进行网络访问，将 _code 提交给服务端，服务端返回 openid 和 unionid，
        // 服务端对 _code 的处理机制参照 步骤二
        //console.log(res) 获取code值
        this.getUnionid(_code, e.detail.userInfo);
      },
      fail: res => {
        toast.show({
          content: '微信登录失败'
        });
      }
    });

  },
  scanCode(){
    wx.scanCode({
      onlyFromCamera: false,
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: res.result
        })
      }
    })
  },
  getUnionid(jscode, userInfo) {
    wx.request({
      // 通过此 url ，获取 openid 与 unionid
      url: 'https://13s.top/other/wx/index.php',
      data: {
        'code': jscode,
      },
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      }, // 设置请求的 header
      success: res => {
        this.onSuccess(res.data, userInfo);
      },
      fail: res => {
        this.onErrorBefore(res);
      }
    });
  },
  onSuccess: function(data, userInfo) {

    console.log(data)
    console.log(userInfo)

    let wxUserInfo = {
      avatarUrl: userInfo.avatarUrl,
      city: userInfo.city,
      gender: userInfo.gender,
      language: userInfo.language,
      nickName: userInfo.nickName,
      province: userInfo.province,
      openid: data.openid,
      session_key: data.session_key
    }
    // wx.setStorage({
    //   key: 'wxUserInfo',
    //   data: wxUserInfo,
    // })
    wx.setStorageSync('wxUserInfo', wxUserInfo)

    this.setData({
      openid: data.openid,
      session_key: data.session_key
    })
  },
  onErrorBefore: function(err) {
    console.log(err)
  }
})