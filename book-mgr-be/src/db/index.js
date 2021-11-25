require('./Schemas/User')

const mongoose = require('mongoose')

const connect = ()=> {
  return new Promise((res)=>{
    //链接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr')
    //数据库被打开的时候执行
    mongoose.connection.on('open',()=>{
      console.log('连接数据库成功');
      res()
    })
  })


}

module.exports={
  connect,
}
