var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shape: "",
    health: "无",
    healthColor: "",
    BMI: 0,
    flavor:[],
    advice: "",
    catalogs: [],
    foodContents: [],
    isTab: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatalog();
    this.getNaive();
  },

  getHealthandShape: function (num) {
    this.setData({//这里要接收到test传过来的值
      BMI: app.globalData.userInformation[0],
      shape: app.globalData.userInformation[1],
      health: app.globalData.userInformation[2],
      flavor: app.globalData.userInformation[3]
    })
    if (num != 0) {
      if (this.data.health == "差")
        this.setData({
          healthColor: "red",
          advice: "             您的身体状况较差！\n建议立刻按照推荐食谱进行食疗调养!"
        })
      else if (this.data.health == "还可以")
        this.setData({
          healthColor: "#FFA500",
          advice: "           您的身体状况还不错！\n建议您考虑健康相关的食谱进行调理！"
        })
      else
        this.setData({
          healthColor: "green",
          advice: "           请您继续保持！\n您还可以考虑美容养生食谱！"
        })
    }
  },

  getCatalog: function () {
    //这里应该是根据test传来的值给catalog赋值，目前先给catalog赋一整个值
    var newarray = [];
    var newarray2 = [];
    newarray = ["男性健身壮阳", "女性健康养护", "老年人延年益寿", "青少年益智增高", "头部眩晕调理", "眼睛干涩调理", "失眠健忘调理", "经常上火调理", "抑郁难过调理", "疲乏无力调理", "免疫力低下调理", "减肥瘦身", "润肤养颜", "排毒怯痘", "养护秀发", "健齿护齿", "养心食谱", "养肺食谱", "养肝食谱", "养胃食谱", "养肾食谱", "肠道养护食谱"]
    var totalNum = 0;
    for (let i = 0; i < app.globalData.userInformation.length; i++)
      if (app.globalData.userInformation[i] == true)
        totalNum++;
    //上一步是在获得目录个数，接下来是获得具体目录
    for (let i = 0; i < app.globalData.userInformation.length; i++) {
      if (app.globalData.userInformation[i] == true) {
        newarray2.push(newarray[i - 4]);
      }
    }
    this.setData({
      catalogs: newarray2
    })

    this.getHealthandShape(totalNum);
  },

  getNaive: function () {
    this.getSortFoods(this.data.catalogs[0]);
  },

  //点击题目可以获得相应的目录————————
  activeNav: function (e) {
    this.setData({
      isTab: true,
      currentIndexNav: e.target.dataset.index,
    })
    //每一次切换目录都需要把之前的数据抛弃，否则会拼接到后面，导致以为没有内容加载
    //其次，page也需要重置，每次都从第一页开始
    this.data.getContents = []
    this.data.getImages = []
    this.data.page = 1
    this.getSortFoods(this.data.catalogs[e.target.dataset.index]);
  },

  getSortFoods: function (singleCatalog) {
    //根据这里的index获取相应的类型的数组
    switch (singleCatalog) {
      case '头部眩晕调理': { this.getFoods('头部眩晕'); break; }
      case '眼睛干涩调理': { this.getFoods('眼睛干涩'); break; }
      case '抑郁难过调理': { this.getFoods('抑郁难过'); break; }
      case '失眠健忘调理': { this.getFoods('失眠健忘'); break; }
      case '经常上火调理': { this.getFoods('经常上火'); break; }
      case '疲乏无力调理': { this.getFoods('疲乏无力'); break; }
      case '免疫力低下调理': { this.getFoods('免疫力低下'); break; }
      case '减肥瘦身': { this.getFoods('减肥瘦身'); break; }
      case '排毒怯痘': { this.getFoods('排毒祛痘'); break; }
      case '润肤养颜': { this.getFoods('润肤养颜'); break; }
      case '养护秀发': { this.getFoods('养护秀发'); break; }
      case '健齿护齿': { this.getFoods('健齿护齿'); break; }
      case '养心食谱': { this.getFoods('心脏功能养护'); break; }
      case '养胃食谱': { this.getFoods('胃部功能养护'); break; }
      case '养肺食谱': { this.getFoods('肺部功能养护'); break; }
      case '养肝食谱': { this.getFoods('肝脏功能养护'); break; }
      case '养肾食谱': { this.getFoods('肾脏功能养护'); break; }
      case '肠道养护食谱': { this.getFoods('肠道功能养护'); break; }
      case '老年人延年益寿': { this.getFoods('老年人延年益寿'); break; }
      case '女性健康养护': { this.getFoods('女性健康养护'); break; }
      case '男性健身壮阳': { this.getFoods('男性健身壮阳'); break; }
      case '青少年益智增高': { this.getFoods('青少年益智增高'); break; }
    }
  },

  getFoods: function (kindName) {
    wx.cloud.callFunction({
      name: "readData",
      data: {
        dbName: "foods",
        kindName: kindName
      }
    }).then(res => {
      this.setData({
        foodContents: res.result.data
      })
      this.sortByFlavor()
    })
  },

  sortByFlavor:function(){
    let sort=[]   //这个数组用来放符合用户口味的个数
    for(let i=0;i<this.data.foodContents.length;i++)
      sort[i]=0
    for(let i=0;i<this.data.foodContents.length;i++){
      for(let j=0;j<this.data.flavor.length;j++){     
        this.data.foodContents[i].flavor = (this.data.foodContents[i].flavor.toString()).split(" ");
        for (let k = 0; k < this.data.foodContents[i].flavor.length;k++){
          if(this.data.foodContents[i].flavor[k]==this.data.flavor[j]){
            sort[i]++;
          }
        }
      }
    }
    var after=this.bubbleSort(sort, this.data.foodContents)
    this.setData({
      foodContents: after //将用户喜欢的口味的菜顺序换上来 
    })
},

  bubbleSort:function(arr,arr2) {
  for(let i = 0;i<arr.length- 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j];
        let temp2=arr2[j]
        arr[j] = arr[j + 1];
        arr2[j] = arr2[j + 1];
        arr[j + 1] = temp;
        arr2[j + 1] = temp2;
      }
    }
  }
  return arr2
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