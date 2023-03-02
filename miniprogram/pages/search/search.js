var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: "",
    outcome: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindTitleInput: function (e) {
    this.data.input = e.detail.value
  },

  searching: function () {
    this.setData({
      outcome:[]
    })
    if (this.data.input == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入内容！',
      })
      return
    }
      wx.showLoading({
        title: '查询中',
      })
    let array = (this.data.input.toString()).split(" ")
      //将关键字按空格分开成为数组，并进行循环查询（结果用and（如果title一致再加入数组中））
    for(let i=0;i<array.length;i++){
      wx.cloud.callFunction({
        name: "readByName",
        data: {
          dbName: 'foods',
          info: array[i]
        }
      }).then(res => {
        if (res.result.data.length != 0) {
          for (let index = 0; index < res.result.data.length; index++) {
            let foodobj = {
              origin:'类型为：'+res.result.data[index].kind+"食谱",
              title: res.result.data[index].title,
              img: res.result.data[index].img,
              content: res.result.data[index].content,
            }
            if (this.checkIfOne(foodobj, this.data.outcome)) {
              var newarray = this.data.outcome
              newarray.push(foodobj)
              this.setData({
                outcome: newarray,
              })
            }
          }
        }
        if(i==array.length-1){
          this.checkSuccess()
          console.log(this.data.outcome)
        }
      })
    }
  },

  checkSuccess:function(){
    if(this.data.outcome.length!=0){
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '查询成功',
      })
    }
    else{
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '无查询结果',
      })
    }
  },

  checkIfOne: function (foodobj,array) {
    for (let i = 0; i < array.length; i++) {
      if (this.data.outcome[i].title == foodobj.title)
        return false
    }
    return true
  },

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