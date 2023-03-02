var app = getApp();
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodSrc: "",
    title: "",
    content: "",
    isAdd: false,
    isLogin:false,
    userName:"",
    //itemID: "",
    //userid:"",
    favorFoods:[],
    isSave:false  //数据库中是否有过该用户的姓名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flag = !app.globalData.isLogin
    this.setData({
      foodSrc: options.image,
      title: options.title,
      content: options.content,
      noLogin: flag
    })    //查询数据库↓
    //this.data.userid = app.globalData.userid   //将用户的id传进来
    this.data.userName = app.globalData.userName   //将用户的姓名传进来
    db.collection('shoucang').where({
      userName:this.data.userName,
    }).get().then(res=>{  
      if(res.data.length!=0)
        {
          this.data.isSave = true //如果有的话就进行匹配
          this.data.favorFoods = res.data[0].foodsList   //查询到的食谱数组
          this.data.itemID = res.data[0]._id   //还需要得到该条记录的_id
          // 进行匹配
        for (let i = 0; i < this.data.favorFoods.length;i++){
          if (this.data.favorFoods[i].title == this.data.title) {
            this.setData({    //已存在的情况:isAdd为true 
              isAdd: true,
            })
          } 
        }  
      }
    })
  },

  //添加收藏
  addFavorites: function () {
    let foodobj = {
      image: this.data.foodSrc,
      title: this.data.title,
      content: this.data.content
    }
    //先查询数据库：如果有该用户的话，更新；如果没有的话，添加该用户
    if(this.data.isSave){
      let newarray = this.data.favorFoods //取出数据库中的食谱数组，将该页食谱添加进去
      newarray.push(foodobj)
      //再进行数据库的更新
      db.collection('shoucang').doc(this.data.itemID).update({
        data: {
          foodsList: newarray
        },
        success:res=>{
          wx.showToast({
            title: '收藏成功',
          })
        }
      })
    }
    else{
      let newarray=[]
      newarray.push(foodobj)
      db.collection('shoucang').add({
        data: {
          userName: this.data.userName,
          foodsList: newarray
        },
        success:res=>{
          wx.showToast({
            title: '收藏成功',
          })
        }
      })
    }
    this.setData({
      isAdd: true
    })
  },

  //取消收藏
  cancelFavorites: function () {
    //同样的方法，先把数组取出来，删除该项，再更新
    let index=-1
    let newarray = this.data.favorFoods
    for(let i=0;i<newarray.length;i++){
      if(newarray[i].title==this.data.title){
        index=i;break;
      }
    }
    if(index>=0){
      newarray.splice(index, 1)
      db.collection('shoucang').doc(this.data.itemID).update({
        data: {
          foodsList: newarray
        },
        success:res=>{
          wx.showToast({
            title: '取消收藏成功',
          })
        }
      })
      this.setData({
        isAdd: false
      })
    }
  },

  introduce: function () {
    wx.navigateTo({
      url: '../introductions/introductions',
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