// pages/introductions/introductions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgPath:'cloud://gc546184266.6763-gc546184266-1301880852/back-ground/intro-pic/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goTo1: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  goTo2: function () {
    wx.switchTab({
      url: '/pages/test/test',
    });
  },

  goTo3: function () {
    wx.switchTab({
      url: '/pages/my/my',
    });
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

  }
})