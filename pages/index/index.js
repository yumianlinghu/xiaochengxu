//index.js
//获取应用实例
const app = getApp()
Page({
  data: { 
    fixnav:false,
    alreadyBtm:false,
    indicatorDots:true,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    autoplay:true,
    circular:true,
    interval:2000,
    duration:500,
    eduArray:[
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '高中/中专646456高中/中专646456'
      },
      {
        id: 2,
        name: '专科'
      },
      {
        id: 3,
        name: '本科'
      }
    ],
    sexArray: [
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      }
    ],
    ageArray: [
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '20~15'
      },
      {
        id: 2,
        name: '25~30'
      },
      {
        id: 3,
        name: '30以上'
      }
    ],
    incomeArray: [
      {
        id: 0,
        name: '不限'
      },
      {
        id: 1,
        name: '3000~5000'
      },
      {
        id: 2,
        name: '5000~10000'
      },
      {
        id: 3,
        name: '10000~15000'
      }
    ],
    eduIndex: 0,
    sexIndex: 0,
    ageIndex: 0,
    incomeIndex:0,
    listData:[
      {
        id:'0',
        title:'洛杉矶45353554545454534efsdfdfsfdsffsdfsdfsd',
        edu:'专科',
        sex:'男',
        age:'30岁以上',
        income:'3000~5000',
        request:'的刷复活谁发给谁电话费第三方的股份'
      }, {
        id: '1',
        title: '萨达阿斯顿',
        edu: '本科',
        sex: '女',
        age: '30岁以上',
        income: '3000~5000',
        request: '的刷复活谁发给谁电话费第三方的股份'
      },
      {
        id: '2',
        title: '空乘',
        edu: '专科',
        sex: '女',
        age: '20岁',
        income: '3000~5000',
        request: '的刷复活谁发给谁电话费第三方的股份'
      },
      {
        id: '3',
        title: '洛杉矶453',
        edu: '专科',
        sex: '男',
        age: '30岁以上',
        income: '3000~5000',
        request: '的刷复活谁发给谁电话费第三方的股份'
      },
      {
        id: '4',
        title: '洛杉矶4',
        edu: '专科',
        sex: '男',
        age: '30岁以上',
        income: '3000~5000',
        request: '的刷复活谁发给谁电话费第三方的股份'
      },
      {
        id: '5',
        title: '洛杉矶',
        edu: '专科',
        sex: '男',
        age: '30岁以上',
        income: '3000~5000',
        request: '的刷复活谁发给谁;  电话费第三方的股份'
      },
      {
        id: '6',
        title: '洛杉矶',
        edu: '专科',
        sex: '男',
        age: '30岁以上',
        income: '3000~50006',
        request: '的刷复活谁发给;谁电话费第三方的股份'
      }
    ]
  },
  onLoad: function () {
   this.getDataList();
  },
  onReady() {
  },
  // 页面滚动时用来固定中间的下拉框选项在顶部
  onPageScroll: function (res) {
    var _this=this;
    wx.createSelectorQuery().select('.select-normal').boundingClientRect((rect)=> {
      console.log(rect);
      if (rect.top <=0){
          _this.setData({
            fixnav: true
          })
        }else{
        _this.setData({
          fixnav: false
        })
      }
    }).exec()
  },
  /**
   * 页面下拉刷新事件的处理函数
   */
  onPullDownRefresh: function () {
    // 下拉刷新时初始化所有参数
    this.setData({
      fixnav: false,
      alreadyBtm: false,
      eduIndex: 0,
      sexIndex: 0,
      ageIndex: 0,
      incomeIndex: 0
    });
    this.getDataList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDataList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  getDataList() { //获取列表
    if(this.data.alreadyBtm){
      return;
    }
    console.log(111)
    var _this=this;
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
   wx.request({
     url: 'jsonplaceholder.typicode.com/posts',
     data: {
       edu: _this.data.eduArray[_this.data.eduIndex].id,
       sex: _this.data.sexArray[_this.data.sexIndex].id,
       age: _this.data.ageArray[_this.data.ageIndex].id,
       income: _this.data.incomeArray[_this.data.incomeIndex].id
     },
     header: {},
     method: 'GET',
     dataType: 'json',
     responseType: 'text',
     success: function(res) {
       _this.setData({
         listData:res.data
       });
     },
     fail: function(res) {},
     complete: function(res) {
      //  下拉刷新要结束
       wx.stopPullDownRefresh();

      //  模拟没有更多数据了展示有底线
       _this.setData({
         alreadyBtm:true
       });
       
      //  隐藏页面中间的加载动画
       setTimeout(function () {
         wx.hideLoading()
       }, 2000)
     },
   });
  },
  getDetail(res) {
     wx.navigateTo({
       url: "../listDetail/listDetail?id="+res.currentTarget.dataset.id
     })
  },
  bindEduPickerChange: function (e) { // 学历变化
    this.setData({
      alreadyBtm:false,
      eduIndex: e.detail.value
    })
    this.getDataList();
  },
  bindSexPickerChange: function (e) { // 性别变化
    this.setData({
      alreadyBtm: false,
      sexIndex: e.detail.value
    })
    this.getDataList();
  },
  bindAgePickerChange: function (e) { // 年龄变化
    this.setData({
      alreadyBtm: false,
      ageIndex: e.detail.value
    })
    this.getDataList();
  },
  bindIncomePickerChange: function (e) { // 收入变化
    this.setData({
      alreadyBtm: false,
      incomeIndex: e.detail.value
    })
    this.getDataList();
  },
})
