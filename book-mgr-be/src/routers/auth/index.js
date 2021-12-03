const Router = require('@koa/router')
const mongoose = require('mongoose')
const {getBody} = require('../../helpers/utils/index')
const jwt = require('jsonwebtoken')


const User = mongoose.model("User");
const InviteCode = mongoose.model('InviteCode')

const router = new Router({
  prefix: '/auth'
})



router.post('/register',async (ctx)=>{
  const {
    account,
    password,
    inviteCode,
  }=getBody(ctx);
  
  //做表单校验
  if(account === '' || password === '' || inviteCode === ''){
    ctx.body = {
      code:0,
      msg:'字段不能为空',
      data:null
    }
    return;
  }

  //判断是否有邀请码
  const findCode = await InviteCode.findOne({
    code:inviteCode
  }).exec();
  //如果没找到邀请码
  if(!findCode){
    ctx.body = {
      code:0,
      msg:'邀请码不正确',
      data:null
    }
    return;
  }
  //找到邀请码判断是否被使用
  if(findCode.user){
    ctx.body = {
      code:0,
      msg:'邀请码被使用',
      data:null
    }
    return;
  }


  //查询数据库中account为"account"的用户
  const findUser = await User.findOne({
    account,//account:account
  }).exec();

  //判断用户是否存在
  if(findUser){
    //如果有返回
    ctx.body = {
      code:0,
      msg:'用户已存在',
      data:null
    }
    return;
  }

  //创建一个用户
  const user = new User({
    account,
    password
  })

  //把创建的用户存入mongodb数据库
  const res = await user.save();
  
  //邀请码与用户id绑定
  findCode.user = res._id;
  findCode.meta.updatedAt = new Date().getTime();
  
  await findCode.save()

  //成功后返回
  ctx.body = {
    code:1,
    msg:'注册成功',
    data:res
  }
 
})
router.post('/login', async (ctx)=>{

  const {
    account,
    password
  }=getBody(ctx);

  if(account === '' || password === ''){
    ctx.body = {
      code:0,
      msg:'字段不能为空',
      data:null
    }
    return;
  }

  const one = await User.findOne({
    account,
  }).exec();

  // console.log(one.account,one.password);
  // console.log(account,password);
  
  if(!one){
    ctx.body={
      code:0,
      msg:'用户名或密码错误',
      data:null
    }

    return;
  }

  const user = {
    account:one.account,
    _id:one._id
  }

  if(one.password == password){
    ctx.body={
      code:1,
      msg:'登录成功',
      data:{
        user,
        token:jwt.sign(user,'book-mgr')
      },
    };
    return;
  }
  ctx.body={
    code:0,
    msg:'用户名或密码错误',
    data:null
  }
})

module.exports = router;
