const db = wx.cloud.database();

Page({
  data: {
    kind: "",   //输出四季和节气的时间
    flavor:"",
    title: "",
    content: "",
    imgSrc: ""
    //tips:""   //tips不想加。。。先放着，可以在数据库里加
  },

  bindKindInput: function (e) {
    this.data.kind = e.detail.value
  },

  bindFlavorInput:function(e){
    this.data.flavor = e.detail.value
  },

  bindTitleInput: function (e) {
    this.data.title = e.detail.value
  },

  bindContentInput: function (e) {
    this.data.content = e.detail.value
  },

  bindImageInput: function (e) {
    this.data.imgSrc = e.detail.value
  },

  submit: function () {
    if (this.title == "" || this.content == "") {
      console.log("没有输入数据")
      return
    }
    db.collection("foods").add({
      data: {
        flavor: this.data.flavor,
        kind: this.data.kind,
        title: this.data.title,
        content: this.data.content,
        img: this.data.imgSrc
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
      }
    })
  }

})