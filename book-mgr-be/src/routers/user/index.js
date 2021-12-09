const Router = require('@koa/router')
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const config = require('../../project.config')

const User = mongoose.model("User");

const router = new Router({
  prefix: '/user'
})
//获取用户列表
router.get('/list', async (ctx)=>{

  let{
    page,
    size,
    keyword
  }= ctx.query;

  page = Number(page);
  size = Number(size);

  const query = {};

  if(keyword){
    query.account = keyword;
  }

  const list = await User
    .find(query)
    .sort({
      _id:-1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();
  
  const total = await User.countDocuments().exec();

  ctx.body={
    msg:"获取列表成功",
    data:{
      list,
      page,
      size,
      total,
    },
    code:1
  }
  
})
//删除用户
router.delete('/:id',async (ctx)=>{
  const {
    id,
  } = ctx.params;

  // console.log(id);

  const delMsg = await User.deleteOne({
    _id:id
  })

  ctx.body={
    msg:'删除成功',
    data:delMsg,
    code:1
  }
})

//增加用户
router.post('/add', async(ctx)=>{
  const{
    account,
    password
  } = getBody(ctx)

  // console.log(getBody(ctx));

  const user = new User({
    account,
    password: password || "123123"
  })

  const res = await user.save()

  ctx.body = {
    data:res,
    code:1,
    msg:'添加成功'
  }
})

//重置用户密码
router.post('/reset/password',async(ctx)=>{
  const {
    id,
  } = getBody(ctx)

  const user = await User.findOne({
    _id:id,
  }).exec();

  if(!user){
    ctx.body = {
      msg:'找不到此用户',
      code:0
    }
    return
  }

  user.password = config.DEFAULT_PASSWORD;

  const res =  await user.save();

  ctx.body={
    msg:'修改成功',
    data:{
      account:res.account,
      _id:res._id
    },
    code:1
  }

})
module.exports = router;
