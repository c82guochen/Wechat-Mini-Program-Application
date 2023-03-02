/*获取当前阳历日期*/
function getCurrentDateTime() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  /*时分秒*/
  /**********************
   var hours = d.getHours();
   var minutes = d.getMinutes();
   var seconds = d.getSeconds();
   var ms = d.getMilliseconds();
   **************************/
  var curDateTime = year;
  if (month > 9)
    curDateTime = curDateTime + "年" + month;
  else
    curDateTime = curDateTime + "年0" + month;
  if (date > 9)
    curDateTime = curDateTime + "月" + date + "日";
  else
    curDateTime = curDateTime + "月0" + date + "日";
  /**********************************
   if (hours > 9)
   curDateTime = curDateTime + " " + hours;
   else
   curDateTime = curDateTime + " 0" + hours;
   if (minutes > 9)
   curDateTime = curDateTime + ":" + minutes;
   else
   curDateTime = curDateTime + ":0" + minutes;
   if (seconds > 9)
   curDateTime = curDateTime + ":" + seconds;
   else
   curDateTime = curDateTime + ":0" + seconds;
   ***************************************/
  curDateTime = curDateTime + " ";
  return curDateTime;
}

/*获取当前是星期几*/
function showWeek() {
  var date = new Date();
  var day = date.getDay();
  var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  var week = weeks[day];
  return week
}

/*获取当前农历日期*/
function showCal() {
  var D = new Date();
  var yy = D.getFullYear();
  var mm = D.getMonth() + 1;
  var dd = D.getDate();
  //var ww = D.getDay();
  //var ss = parseInt(D.getTime() / 1000);
  if (yy < 100) yy = "19" + yy;
  return GetLunarDay(yy, mm, dd);
}

//定义全局变量 
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
  return (m >> n) & 1;
}

//农历转换 
function e2c() {
  TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
  var total, m, n, k;
  var isEnd = false;
  var tmp = TheDate.getYear();
  if (tmp < 1900) {
    tmp += 1900;
  }
  total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

  if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
    total++;
  }
  for (m = 0; ; m++) {
    k = (CalendarData[m] < 0xfff) ? 11 : 12;
    for (n = k; n >= 0; n--) {
      if (total <= 29 + GetBit(CalendarData[m], n)) {
        isEnd = true;
        break;
      }
      total = total - 29 - GetBit(CalendarData[m], n);
    }
    if (isEnd) break;
  }
  cYear = 1921 + m;
  cMonth = k - n + 1;
  cDay = total;
  if (k == 12) {
    if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
      cMonth = 1 - cMonth;
    }
    if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
      cMonth--;
    }
  }
}

function GetcDateString() {
  var tmp = "";
  /*显示农历年：（ 如：甲午(马)年 ）*/
  tmp+=tgString.charAt((cYear-4)%10); 
  tmp+=dzString.charAt((cYear-4)%12); 
  tmp+="("; 
  tmp+=sx.charAt((cYear-4)%12); 
  tmp+=")年        ";
  if (cMonth < 1) {
    tmp += "(闰)";
    tmp += monString.charAt(-cMonth - 1);
  } else {
    tmp += monString.charAt(cMonth - 1);
  }
  tmp += "月";
  tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
  if (cDay % 10 != 0 || cDay == 10) {
    tmp += numString.charAt((cDay - 1) % 10);
  }
  return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
  //solarYear = solarYear<1900?(1900+solarYear):solarYear; 
  if (solarYear < 1921 || solarYear > 2020) {
    return "";
  } else {
    solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
    e2c(solarYear, solarMonth, solarDay);
    return GetcDateString();
  }
}

function getJieqi(){
  var Jieqi=new Array(24);
  var currentJieqi="今日是",currentSeason="现在是";
  Jieqi[0] = "立春";  Jieqi[1] = "雨水";  Jieqi[2] = "惊蛰";  Jieqi[3] = "春分";
  Jieqi[4] = "清明";  Jieqi[5] = "谷雨";  Jieqi[6] = "立夏";  Jieqi[7] = "小满";
  Jieqi[8] = "芒种";  Jieqi[9] = "夏至";  Jieqi[10] ="小暑";  Jieqi[11] = "大暑";
  Jieqi[12] = "立秋"; Jieqi[13] = "处暑";  Jieqi[14] = "白露"; Jieqi[15] = "秋分";
  Jieqi[16] = "寒露"; Jieqi[17] = "霜降";  Jieqi[18] = "立冬";  Jieqi[19] = "小雪";
  Jieqi[20] = "大雪";  Jieqi[21] = "冬至";  Jieqi[22] = "小寒";  Jieqi[23] = "大寒";
  var D = new Date();
  var mm = D.getMonth() + 1;
  var dd = D.getDate();
  //使用switch得到月份日期对应的节气
  switch(mm)
  { case 1:{    if (dd == 6) currentJieqi += Jieqi[22];
                else if (dd == 20) currentJieqi += Jieqi[23];break;   }
    case 2:{    if(dd==4)  currentJieqi += Jieqi[0];
                else if (dd == 19)  currentJieqi += Jieqi[1]; break;  }
    case 3:{    if (dd== 5 ) currentJieqi += Jieqi[2]; 
                else if (dd == 20)currentJieqi += Jieqi[3];  break;   }
    case 4:{    if (dd == 4) currentJieqi += Jieqi[4];
                else if (dd == 19) currentJieqi += Jieqi[5]; break;   }
    case 5:{    if (dd == 5) currentJieqi += Jieqi[6];
                else if (dd == 20) currentJieqi += Jieqi[7]; break;   }
    case 6:{    if (dd == 5) currentJieqi += Jieqi[8];
                else if (dd == 21) currentJieqi += Jieqi[9];break;    }
    case 7: {   if (dd == 6) currentJieqi += Jieqi[10];
                else if (dd == 22) currentJieqi += Jieqi[11];break;   }
    case 8: {   if (dd == 7) currentJieqi += Jieqi[12];
                else if (dd == 22) currentJieqi += Jieqi[13];break;   }
    case 9: {   if (dd == 7) currentJieqi = Jieqi[14];
                else if (dd == 22) currentJieqi += Jieqi[15];break;   }
    case 10: {  if (dd == 8) currentJieqi += Jieqi[16];
                else if (dd == 23) currentJieqi += Jieqi[17];break;   }
    case 11: {  if (dd == 7) currentJieqi += Jieqi[18];
                else if (dd == 22) currentJieqi += Jieqi[19];break;   }
    case 12: {  if (dd == 7) currentJieqi += Jieqi[20];
                else if (dd == 21) currentJieqi += Jieqi[21];break;   }
  }
  if((mm==2&&dd>=4)||mm==3||mm==4||(mm==5&&dd<5))
     currentSeason +="春季";
  else if ((mm == 5 && dd >= 5)|| mm == 6 || mm == 7 || (mm == 8 && dd < 7))
    currentSeason += "夏季";
  else if ((mm == 8 && dd >= 7)|| mm == 9 || mm == 10 || (mm == 11 && dd < 7))
    currentSeason += "秋季";
  else if ((mm == 11 && dd >= 7)|| mm == 12 || mm == 1 || (mm == 2 && dd < 4))
    currentSeason += "冬季";
  //如果currentJieqi后面没有跟到东西的话，就返回comingJieqi
  if(currentJieqi !="今日是")
    return currentJieqi;
  else
    return currentSeason; 
}

function getSeason() {
  var currentSeason="";
  var D = new Date();
  var mm = D.getMonth() + 1;
  var dd = D.getDate();
  if ((mm == 2 && dd >= 4) || mm == 3 || mm == 4 || (mm == 5 && dd < 5))
    currentSeason = "春季";
  else if ((mm == 5 && dd >= 5) || mm == 6 || mm == 7 || (mm == 8 && dd < 7))
    currentSeason = "夏季";
  else if ((mm == 8 && dd >= 7) || mm == 9 || mm == 10 || (mm == 11 && dd < 7))
    currentSeason = "秋季";
  else if ((mm == 11 && dd >= 7) || mm == 12 || mm == 1 || (mm == 2 && dd < 4))
    currentSeason = "冬季";
return currentSeason;
}

function getBackImg() {
  var imgSrc = "";
  var season = getSeason();
  if (season == "春季")
    imgSrc = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/spring-bg/spr.jpg";
  else if (season == "夏季")
    imgSrc = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/summer-bg/sum.jpg";
  else if (season == "秋季")
    imgSrc = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/autumn-bg/aum.jpg";
  else
    imgSrc = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/winter-bg/win.jpg";
  return imgSrc;
}

function getSwiper(){
  var season = getSeason();
  var swiperSrc = new Array(3);
  if (season == "春季")
   {
    swiperSrc[0] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/spring-bg/1.jpg";
    swiperSrc[1] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/spring-bg/2.jpg";
    swiperSrc[2] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/spring-bg/3.jpg";
   } 
  else if (season == "夏季")
  {
    swiperSrc[0] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/summer-bg/1.jpg";
    swiperSrc[1] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/summer-bg/2.jpg";
    swiperSrc[2] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/summer-bg/3.jpg";
  } 
  else if (season == "秋季")
  {
    swiperSrc[0] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/autumn-bg/1.jpg";
    swiperSrc[1] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/autumn-bg/2.jpg";
    swiperSrc[2] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/autumn-bg/3.jpg";
  } 
  else
  {
    swiperSrc[0] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/winter-bg/1.jpg";
    swiperSrc[1] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/winter-bg/2.jpg";
    swiperSrc[2] = "cloud://gc546184266.6763-gc546184266-1301880852/back-ground/winter-bg/3.jpg";
  } 
  return swiperSrc;
}

module.exports = {
  showCal: showCal,
  showWeek:showWeek,
  getJieqi:getJieqi,
  getSeason: getSeason,
  getBackImg:getBackImg,
  getSwiper: getSwiper
}