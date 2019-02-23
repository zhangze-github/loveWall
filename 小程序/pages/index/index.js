// pages/index/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getData: [],
    number: 0,
    info:{},
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://zeze.work/api/get',
      data: {
        index: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({ getData: res.data });
        that.setData({ number: ++that.data.number })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
    let that = this;
    wx.request({
      url: 'https://zeze.work/api/get',
      data: {
        index: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({ getData: res.data });
        that.setData({ number: 0 })
      } 
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    wx.request({
      url: 'https://zeze.work/api/get',
      data: {
        index: this.data.number
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let resData = that.data.getData;
        let number = that.data.number;
        if(number >= 10){
          wx.showToast({
            title: '小可爱， 你已经浏览了100条了，服务器快受不了啊。',
            icon: 'none',
            duration: 2000
          })
          return;
        }else{
          res.data.map((item, index) => {
            resData[index + number*10] = item;
          })
          that.setData({ getData: resData });
          that.setData({ number: ++number });
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onPullDownRefresh: function () {
    let that = this;
    wx.request({
      url: 'https://zeze.work/api/get',
      data: {
        index: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({ getData: res.data });
        that.setData({ number: 1 })
      } 
    })
  },
})