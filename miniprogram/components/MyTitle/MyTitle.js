var util = require('../../utils/util.js');
var getdates = require('../../utils/getdates.js');
// component/MyTitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    time:null,
    lunarDate:"",
    week:"",
    jieqi:"",
    imgSrc:"",
  },

  /**
   * 组件的方法列表
   */
    ready: function () { 
      // 调用函数时，传入new Date()参数，返回值是日期和时间
      var TIME = util.formatTime(new Date());
      // 这里获得阳历日期
      var date =getdates.showCal();
      var WEEK =getdates.showWeek(); 
      var JIEQI = getdates.getJieqi();
      var IMGSRC=getdates.getBackImg();
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData({
        time:TIME,
        lunarDate:date,
        week:WEEK,
        jieqi:JIEQI,
        imgSrc:IMGSRC
      });
    }

})
