// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database();  //获得云数据库引用
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var name = event.dbName
  var foodInfo=event.info
  return await db.collection(name).where(
    _.or([
    {
      title: db.RegExp({
        regexp: foodInfo,
        options: 'i',
      })
    },
    {
      content: db.RegExp({
        regexp: foodInfo,
        options: 'i',
      })
    },
    {
      kind: db.RegExp({
        regexp: foodInfo,
        options: 'i',
      })
    },
    {
      flavor: db.RegExp({
       regexp: foodInfo,
       options: 'i',
      })
    },
  ])
  ).get();
}