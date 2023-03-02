var app = getApp();
//有个bug，需要重新输一遍身高……

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //年龄、身高、体重都是输入的内容
    num: 0, age: 0, height: 0, weight: 0, BMI: 0, shape: "无", condition: "无",
    isMan: false, isWoman: false, isTeenager: false, isOlder: false,
    isHead: false, isEyes: false, isSleep: false, isFire: false,
    isDepress: false, isTired: false, isLowim: false, isFat: false,
    isSkin: false, isFace: false, isHair: false, isMouth: false,
    isHeart: false, isLung: false, isLiver: false, isStomach: false,
    isKidney: false, isIntes: false, advice: "", isTab: [],
    diaShow: false, flavor: [],

  },
  //这里是按钮提交全部数据，准备跳转至推荐食谱页面推荐各类食谱
  submit: function () {
    if (this.data.age < 10 || this.data.age > 150 || this.data.height > 240 || this.data.height < 50 || this.data.weight > 600 || this.data.weight < 5) {
      this.setData({
        diaShow: true,
      }); return
    }
    var flag = true;
    for (var i = 0; i < 11; i++)
      if (this.data.isTab[i] != true) {
        flag = false;
      }
    if (flag) {
      this.calculateBMIandCondition();
      this.getData();
      this.setData({
        advice: ""
      })
      //跳转到detail页面
      wx.navigateTo({
        url: '/pages/details/details',
      });
    }
    else
      this.setData({
        advice: "(请把必答问题回答完！)"
      })
  },

  //这里是关闭弹窗的函数
  closeDialog: function () {
    this.setData({
      diaShow: false,
    })
  },

  //必答问题
  //从这里开始接下来3个输入的是年龄、身高和体重
  bindAgeInput: function (e) {
    //年龄将决定是青少年还是老年人
    this.data.isTab[1] = true;
    this.data.age = e.detail.value;
    if (this.data.age >= 10 && this.data.age <= 150) {
      if (this.data.age <= 19) {
        this.data.isTeenager = true
        this.data.isOlder = false
       } 
      else if (this.data.age > 60) {
        this.data.isOlder = true
        this.data.isTeenager = false
      }
    }
  },

  bindHeightInput: function (e) {
    this.data.isTab[2] = true;
    this.data.height = e.detail.value;
  },

  bindWeightInput: function (e) {
    this.data.isTab[3] = true;
    this.data.weight = e.detail.value;
  },

  bindSex: function (e) {
    this.data.isTab[0] = true;
    if (e.detail.value == "男性") {
      this.data.isMan = true
      this.data.isWoman = false
    }
    else {
      this.data.isMan = false,
        this.data.isWoman = true
    }
  },

  bindHead5: function (e) {
    this.data.isTab[4] = true;
    if (e.detail.value == "有") {
      this.data.num = this.data.num + 1
      this.data.isHead = true
    }
    else {
      this.data.isHead = false
    }
  },

  bindEyes6: function (e) {
    this.data.isTab[5] = true;
    var that = this;
    if (e.detail.value == "会") {
      this.data.num = this.data.num + 1
      this.data.isEyes = true
    }
    else {
      this.data.isEyes = false
    }
  },

  bindSleep7: function (e) {
    this.data.isTab[6] = true;
    if (e.detail.value == "有") {
      this.data.num = this.data.num + 1
      this.data.isSleep = true
    }
    else {
      this.data.isSleep = false
    }
  },

  bindFire8: function (e) {
    this.data.isTab[7] = true;
    if (e.detail.value == "有") {
      this.data.num = this.data.num + 1;
      this.data.isFire = true
    }
    else {
      this.data.isFire = false
    }
  },

  bindDpress9: function (e) {
    this.data.isTab[8] = true;
    if (e.detail.value == "有") {
      this.data.num = this.data.num + 1
      this.data.isDepress = true
    }
    else {
      this.data.isDepress = false
    }
  },

  bindTired10: function (e) {
    this.data.isTab[9] = true;
    if (e.detail.value == "会") {
      this.data.num = this.data.num + 1;
      this.data.isTired = true
    }
    else {
      this.data.isTired = false
    }
  },

  bindLowim11: function (e) {
    this.data.isTab[10] = true;
    if (e.detail.value == "是") {
      this.data.num = this.data.num + 1;
      this.data.isLowim = true
    }
    else {
      this.data.isLowim = false
    }
  },

  calculateBMIandCondition: function () {
    if (this.data.num < 3) this.setData({ condition: "非常好" })
    else if (this.data.num < 6) this.setData({ condition: "还可以" })
    else this.setData({ condition: "差" })

    //只有当数据都正常的时候，才能开始计算BMI
    this.data.BMI = (this.data.weight / 2) / ((this.data.height / 100) * (this.data.height / 100))
    this.data.BMI = this.data.BMI.toFixed(1);
    if (this.data.BMI < 18.5) this.setData({ shape: "偏瘦" })
    else if (this.data.BMI < 23.9) this.setData({ shape: "正常" })
    else if (this.data.BMI >= 23.9) {      //超重这里需要强制推荐减肥食谱
      this.setData({
        shape: "超重 -- ",
        isFat: true
      })
      if (this.data.BMI < 26.9) {
        var str = this.data.shape + "偏胖";
        this.setData({ shape: str })
      }
      else if (this.data.BMI < 29.9) {
        var str = this.data.shape + "肥胖";
        this.setData({ shape: str })
      }
      else if (this.data.BMI >= 29.9) {
        var str = this.data.shape + "重度肥胖";
        this.setData({ shape: str })
      }
    }
  },

  //美容问题
  bindFat1: function (e) {
    if (e.detail.value == "是")
      this.data.isFat = true
    else
      this.data.isFat = false
  },

  bindSkin2: function (e) {
    if (e.detail.value == "否")
      this.data.isSkin = true
    else
      this.data.isSkin = false
  },

  bindFace3: function (e) {
    if (e.detail.value == "有")
      this.data.isFace = true
    else
      this.data.isFace = false
  },

  bindHair4: function (e) {
    if (e.detail.value == "是")
      this.data.isHair = true
    else
      this.data.isHair = false
  },

  bindMouth5: function (e) {
    if (e.detail.value == "不好")
      this.data.isMouth = true
    else
      this.data.isMouth = false
  },

  //脏腑养生
  bindHeart1: function (e) {
    if (e.detail.value == "是")
      this.data.isHeart = true
    else
      this.data.isHeart = false
  },

  bindLung2: function (e) {
    if (e.detail.value == "是")
      this.data.isLung =true
    else
      this.data.isLung = false
  },

  bindLiver3: function (e) {
    if (e.detail.value == "是")
      this.data.isLiver = true
    else
      this.data.isLiver = false
  },

  bindStomach4: function (e) {
    if (e.detail.value == "是")
      this.data.isStomach = true
    else
      this.data.isStomach = false
  },

  bindKidney5: function (e) {
    if (e.detail.value == "是")
      this.data.isKidney = true
    else
      this.data.isKidney = false
  },

  bindIntestine6: function (e) {
    if (e.detail.value == "是")
      this.data.isIntes = true
    else
      this.data.isIntes = false
  },

  favoredTaste: function (e) {
    this.data.flavor = e.detail.value
  },

  getData: function () {
    var array = [];
    array = [this.data.BMI, this.data.shape, this.data.condition,
    this.data.flavor, this.data.isMan, this.data.isWoman, this.data.isOlder, this.data.isTeenager, this.data.isHead, this.data.isEyes, this.data.isSleep, this.data.isFire, this.data.isDepress, this.data.isTired, this.data.isLowim, this.data.isFat, this.data.isSkin, this.data.isFace, this.data.isHair, this.data.isMouth, this.data.isHeart, this.data.isLung, this.data.isLiver, this.data.isStomach, this.data.isKidney, this.data.isIntes];
    app.globalData.userInformation = array;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < 11; i++)
      this.data.isTab[i] = false;
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

  },

})


