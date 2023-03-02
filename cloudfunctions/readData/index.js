// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()  //初始化SDK

let db = cloud.database();  //获得云数据库引用

// 云函数入口函数
exports.main = async (event, context) => {
  var name = event.dbName
  var kindName = event.kindName
  return await db.collection(name).where({
    kind: db.RegExp({
      regexp: kindName,
      options: 'i',
    })
  }).get();
}