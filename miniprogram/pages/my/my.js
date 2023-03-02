var app = getApp();
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "未登录",
    src: "../../icons/index2.png",
    isShow:false,
    foodsList: [],
    number: 0,
    // openid:"",
    // code:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  //获取个人信息
  getMyInfo: function (e) {
    //var that=this
    //先登陆获得用户的openid
    // wx.login({    //这部分需要在服务端写，在服务端写不能用……
    //   success: res => {
    //     that.data.code = res.code
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx8412ee4850c4d04e&secret=9f8b0237972dcc91cf420fd58fc49ded&js_code=' + that.data.code + '&grant_type=authorization_code',
    //       method: "GET",
    //       success(res) {
    //         that.data.openid=res.data.openid    //获得用户唯一的openid
    //         app.globalData.userid = that.data.openid
    //         that.getMyFavorites();
    //       }
    //     })
    //   }
    // })
    //再获得用户信息
    let info = e.detail.userInfo;
    this.setData({
      src: info.avatarUrl,
      nickName: info.nickName,
      isLogin: true
    })
    app.globalData.isLogin=this.data.isLogin
    app.globalData.userName = this.data.nickName
  },

  //更新number
  getMyFavorites: function () {
    let flag= !this.data.isShow
    this.setData({
      isShow:flag
    })
    db.collection('shoucang').where({
      userName: this.data.nickName,
    }).get().then(res => {
      this.setData({
        number: res.data[0].foodsList.length,
        foodsList: res.data[0].foodsList,     //查询到的食谱数组
      })  
    })
  },

  goToDetail: function (e) {
    wx.navigateTo({
      url: '../single/single?title=' + e.currentTarget.dataset.title + '&content=' + e.currentTarget.dataset.content + '&image=' + e.currentTarget.dataset.image,
    })
  },

  introduce: function () {
    wx.navigateTo({
      url: '../introductions/introductions',
    })
  },

  goToSearch: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },

    // gotoBoard: function () {
  //   let that = this;
  //   wx.navigateTo({
  //     url: '../board/board?name=' + that.data.nickName
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isShow: false
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
    if (this.data.isLogin) {
      wx.showLoading({
        title: '数据加载中',
      })      //显示“数据正在加载中”，显示“loading”
      this.getMyFavorites();
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }
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