const Router = require('@koa/router')
const mongoose = require('mongoose')
// const { getBody } = require('../../helpers/utils')
const {getBody} = require('../../helpers/utils/index')

const BOOK_CONST = {
  IN:1,
  OUT:2
}

const Book = mongoose.model("Book");
const InventoryLog = mongoose.model('InventoryLog')

const findBookOne = async(id) =>{
  const one = await Book.findOne({
    _id:id,
  }).exec();

  return one;
};



const router = new Router({
  prefix: '/book'
})
//增加书籍
router.post('/add',async (ctx)=>{
  const {
    name,
    price,
    author,
    publishDate,
    classify,
    count
  }= getBody(ctx);
  
  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
    count
  })

 const res = await book.save();

  ctx.body = {
    data:res,
    code:1,
    msg:'添加成功'
  }

})
//请求书籍信息
router.get('/list', async (ctx) => {

  const {
    page = 1,
    keyword
  } = ctx.query;
  let{
    size = 10,
  } = ctx.query;

  size= Number(size);

  const query = {}
  if(keyword){
    query.name= keyword
  }

  const list = await Book
    .find(query)
    //倒叙排序
    .sort({
      _id:-1
    })
    //跳过的条数
    .skip((page-1)*size)
    // 读取的条数
    .limit(size)
    .exec();

  //数据总条数
  const total = await Book.countDocuments();

  ctx.body ={
    data:{
      list,
      total,
      page,
      size,
    },
    code:1,
    msg:'获取列表成功'
  }
})
//删除书籍
router.delete('/:id',async (ctx)=>{
  const {
    id,
  } = ctx.params;

  const delMsg = await Book.deleteOne({
    _id:id
  })

  ctx.body= {
    data:delMsg,
    msg:'删除成功',
    code:1
  };
});
//修改书籍库存
router.post('/update/count', async (ctx)=> {
  const {
    id,
    type
  } = getBody(ctx);

  // console.log(id);

  let{
    num
  } = getBody(ctx);

  num = Number(num);

  const book = await findBookOne(id)

  if(!book){
    ctx.body={
      code:0,
      msg:"没找到书籍"
    }
    return
  }
  
  if(type === BOOK_CONST.IN ){
    //入库
    num = Math.abs(num);
  }else{
    //出库
    num = -Math.abs(num)
  }

  book.count =  book.count + num

  if(book.count < 0){
    ctx.body = {
      code:0,
      msg:"书籍数量不足以出库"
    };
    return;
  }

  const res = await book.save();

  const log = new InventoryLog({
    num:Math.abs(num),
    type
  })

   log.save();

  ctx.body = {
    data:res,
    code:1,
    msg:'操作成功'
  }
})
//修改书籍信息
router.post('/update',async (ctx)=>{
  const {
    id,
    ...others
  }= getBody(ctx);

  const one = await Book.findOne({
    _id:id,
  }).exec();
  //没找到书籍
  if(!one){
    ctx.body={
      msg:'没有找到书籍',
      code:0,
    }
    return
  }

  //找到书籍
  const newQuery = {};
  Object.entries(others).forEach(([key,value])=>{
    if(value){
      newQuery[key] = value;
    }
  });

  Object.assign(one,newQuery);

  const res = await one.save();

  ctx.body={
    data:res,
    code:1,
    msg:'保存成功'
  }
})
//
router.get('/detail/:id',async(ctx)=>{
  const {
    id,
  } = ctx.params;

  const one = await findBookOne(id)
  
  //没找到书籍
  if(!one){
    ctx.body={
      msg:'没有找到书籍',
      code:0,
    }
    return;
  }

  ctx.body = {
    msg:'查询成功',
    data:one,
    code:1
  }
})
module.exports = router;
