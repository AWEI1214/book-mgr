const Router = require('@koa/router')
const mongoose = require('mongoose')

const User = mongoose.model("User");

const router = new Router({
  prefix: '/auth'
})

router.post('/register',async (ctx)=>{

  // const User = new User({
  //   account:'',
  //   password:''S
  // })

  // const res = await User.save();

  ctx.body = {
    code:1,
    msg:'注册成功',
    // data:res
  }
})
router.post('/login', async (ctx)=>{
  // ctx.body = '登录成功' 
})

module.exports = router;
