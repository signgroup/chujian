var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodDetailData:[],
    recipeMethod:[],
    recipeIngredients:[],
    tagArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.getMenuDetailsData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getMenuDetailsData(options) {    
    let url = "v1/cook/menu/query?key=27c4919c4f201&id="+ options.id;
    app.webCall(url, {}, "get", this.onSuccess, this.onErrorBefore);
  },
  onSuccess: function (res) {

    var foodDetailData={};
    
    console.log(res.result.ctgTitles)
    var tagArr = res.result.ctgTitles
    tagArr = tagArr.split(',');
    console.log(tagArr)
    this.setData({
      foodDetailData:res.result,
      tagArr: tagArr,
      recipeMethod: JSON.parse(res.result.recipe.method),
      recipeIngredients: JSON.parse(res.result.recipe.ingredients),
    })
  }
})