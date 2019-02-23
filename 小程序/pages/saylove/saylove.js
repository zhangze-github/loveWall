// // pages/saylove/saylove.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })

//获取应用实例
// var app = getApp();
// const AV = require('../../libs/av-weapp-min.js');
// var toolTip = require('../../libs/ToolTip/toolTip.js');
var productSrc = [];
Page({
  data: {
    focus: false,
    title: "",
    content: "",
    isCheck: false,
    productSrc: [],
    isShow: false,
    userInfo: {},
    isRefresh: false,
    textareaContent: "",
    tempFilePaths: {}
  },
  onLoad: function () {
    // toolTip.init(this);
    //获取个人信息
    // var _that = this;
    // _that.data.productSrc = [];
    // productSrc = [];
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   _that.setData({
    //     userInfo: userInfo
    //   });
    // });
  },
  titleEventFunc: function (e) {
    if (e.detail && e.detail.value) {
      this.data.title = e.detail.value;
    }
    if(e.detail.value === ''){
      this.data.title = '';
    }
  },
  contentEventFunc: function (e) {
    if (e.detail && e.detail.value) {
      this.data.content = e.detail.value;
    }
    if(e.detail.value === ''){
      this.data.content = '';
    }
  },
  formSubmit: function (e) {
    var _that = this;
    var titleVal = _that.data.title;
    var contentVal = _that.data.content;
    var time = wx.getStorageSync('time');
    if (titleVal === "" || titleVal.length <= 0) {
      wx.showToast({
        title: '请填写表白对象',
        icon: 'none',
        duration: 1000
      })
      return;
    }else if (contentVal === "") {
      wx.showToast({
        title: '请填写表白内容',
        icon: 'none',
        duration: 1000
      })
      return;
    } 
    // else if (((new Date().getTime()) - time) < 604800000){
    else if (false) {
      wx.showToast({
        title: '一周内只允许表白一次',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    else { //表白内容没有问题可以发送
      wx.request({
        url: 'https://zeze.work/api/add',
        data: {
          message: contentVal,
          title: titleVal
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          wx.setStorage({
            key: 'time',
            data: new Date().getTime()
          }),
          wx.showToast({
            title: '表白成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(()=>{
            wx.switchTab({
              url: '../../pages/index/index'
            })
          }, 1000)
        }
      })
    }
  },
  formReset: function () {
    var _that = this;
    // setTimeout(function () {
    // 	_that.setData({
    // 		tempFilePaths: [],
    // 		isShow:false,
    // 		textareaContent:" "
    // 	});
    // },300)
    this.data.title = '';
    this.data.content = '';
  },
})
