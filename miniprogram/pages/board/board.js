// pages/board/board.js

//用户名不能显示的问题
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    nextName: "",
    content: "",
    touchedNumber: "",
    isSuccess: false,
    isFail: false,
    isEmpty: false,
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.nickName = options.name
  },

  //这里用来收集留言的内容
  bindContentInput: function (e) {
    this.data.content = e.detail.value
  },

  //这里是联系方式
  bindNumInput: function (e) {
    this.data.touchedNumber = e.detail.value
  },

  //决定是否匿名
  showChange: function (e) {
    this.data.isShow = e.detail.value
  },

  //这里是提交函数
  submit: function () {
    //如果成功了需要显示“留言成功！”
    if (this.data.content == "") {
      this.setData({
        isEmpty: true,
      })
      return
    }

    if (this.data.isShow)
      this.data.nextName = "匿名用户"
    else
      this.data.nextName = this.data.nickName
    var info = "";
    if (this.data.touchedNumber != "")
      info = this.data.nextName + '-' + this.data.touchedNumber;
    else
      info = this.data.nextName;
    db.collection("messages").add({
      data: {
        info: info,
        content: this.data.content,
      },
      success: res => {
        this.setData({
          isSuccess:true
        })
      },
      fail: err => {
        this.setData({
          isFail:true
        })
      }
    })
  },

  closeDialog: function () {
    this.setData({
      isSuccess: false,
      isFail: false,
      isEmpty: false,
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