var getdates = require('../../utils/getdates.js');
var db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSeason: "",    //当前季节
    tmpSeason: "",       //当前节气或者季节
   // dbName:'',
    kind:'',
    swiperSrc: ["", "", ""],
    foodContents: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var swiper = getdates.getSwiper();
    this.setData({    swiperSrc: swiper,    })
    this.getToday()   //先获得季节，如果有节气就给tmpSeason赋值
    this.getFoods();  //获得数据
  },

  getFoods: function () {
    // wx.cloud.callFunction({
    //   name: "readData",
    //   data: {
    //     dbName: this.data.dbName
    //   }
    // }).then(res=>{
    //   let newarray=[]
    //   if(this.data.tmpSeason!=this.data.currentSeason){   
    //     //只有当天是节气的时候，加上节气信息
    //     for (let i = 0; i < res.result.data.length; i++)
    //       if (res.result.data[i].kind == this.data.tmpSeason)
    //         newarray.push(res.result.data[i])
    //   }
    //   for (let i = 0; i < res.result.data.length; i++)
    //     if (res.result.data[i].kind == this.data.currentSeason)
    //       newarray.push(res.result.data[i])
    //     this.setData({
    //       foodContents:newarray
    //     })
    //     console.log(this.data.foodContents)
    // }) 这是第一种方法，读各自的数据库，接下来是第二种方法，读整个数据库
    let newarray=[]
    if(this.data.tmpSeason!=this.data.currentSeason){
      wx.cloud.callFunction({
        name: "readData",
        data: {
          dbName: "foods",
          kindName:this.data.tmpSeason
        }
      }).then(res=>{
        for (let i = 0; i < res.result.data.length; i++)
            newarray.push(res.result.data[i])
      })
    }
    wx.cloud.callFunction({
      name: "readData",
      data: {
        dbName: "foods",
        kindName:this.data.currentSeason
      }
    }).then(res=>{
      for (let i = 0; i < res.result.data.length; i++)
          newarray.push(res.result.data[i])
      this.setData({
        foodContents:newarray
      })
    })

  },

  getToday: function () {
    this.data.currentSeason = getdates.getJieqi();
    this.data.currentSeason = this.data.currentSeason.substring(3, this.data.currentSeason.length);       
    //获得当天的节气或者季节信息
    if (this.data.currentSeason == "春季" || this.data.currentSeason == "立春" || this.data.currentSeason == "雨水" || this.data.currentSeason == "惊蛰" || this.data.currentSeason == "春分" || this.data.currentSeason == "清明" || this.data.currentSeason == "谷雨")
      this.setData({
        tmpSeason: this.data.currentSeason, //tmp是节气
        currentSeason: "春季"     //current是季节
      })
    else if (this.data.currentSeason == "夏季" || this.data.currentSeason == "立夏" || this.data.currentSeason == "小满" || this.data.currentSeason == "芒种" || this.data.currentSeason == "夏至" || this.data.currentSeason == "小暑" || this.data.currentSeason == "大暑")
      this.setData({
        tmpSeason: this.data.currentSeason,
        currentSeason: "夏季"
      })
    else if (this.data.currentSeason == "秋季" || this.data.currentSeason == "立秋" || this.data.currentSeason == "处暑" || this.data.currentSeason == "白露" || this.data.currentSeason == "秋分" || this.data.currentSeason == "寒露" || this.data.currentSeason == "霜降")
      this.setData({
        tmpSeason: this.data.currentSeason,
        currentSeason: "秋季"
      })
    else if (this.data.currentSeason == "冬季" || this.data.currentSeason == "立冬" || this.data.currentSeason == "小雪" || this.data.currentSeason == "大雪" || this.data.currentSeason == "冬至" || this.data.currentSeason == "小寒" || this.data.currentSeason == "大寒")
      this.setData({
        tmpSeason: this.data.currentSeason,
        currentSeason: "冬季"
      })
      //this.alterDatabase()
  },

  // alterDatabase:function(){
  //   switch (this.data.currentSeason){
  //     case '春季': { this.data.dbName = 'spring';break;}
  //     case '夏季': { this.data.dbName = 'summer'; break; }
  //     case '秋季': { this.data.dbName = 'autumn'; break; }
  //     case '冬季': { this.data.dbName = 'winter'; break; }
  //   }
  // },

  showSingle: function (e) {
    wx.navigateTo({
      url: '../single/single?title=' + e.currentTarget.dataset.title + '&content=' + e.currentTarget.dataset.content + '&image=' + e.currentTarget.dataset.image,
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