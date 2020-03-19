// pages/listDetail/listDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:'',
     detailData:{
       title:'空乘',
       sex:'男',
       age:'30岁以上',
       edu:'本科',
       income:'10000~15000',
       request:'谁点覅不舒服省份是否'
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!!JSON.stringify(options.id)){
      this.setData({
        id: options.id
      });
      this.getDetail();
    }
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
    this.getDetail();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 请求数据
  getDetail() {
    const _this=this;
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    wx.request({
      url: '',
      data: {
        id:_this.data.id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        _this.setData({
          detailData:res.data
        });
      },
      fail: function(res) {},
      complete: function(res) {
        // 隐藏掉下拉刷新动画
        //  下拉刷新要结束
        wx.stopPullDownRefresh();

        // 隐藏掉加载动画
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      },
    })
  }
})