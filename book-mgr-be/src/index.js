const Koa = require('koa')

const app = new Koa();

 
//context 上下文-当前请求的相关信息都在里面
app.use(async (context,next) => {
  const {path = '/'} = context
  if(path==='/user/123'){
    context.body='返回用户123的信息';
    return;
  }
  context.body= '404';
  console.log(0);
  await next();
  // console.log(ctx.URL);
  // console.log(ctx.path);
});

app.use(async(context)=>{
  console.log(1);
  context.body = '找不到资源'
})
app.listen(3000,()=>{
  console.log('启动成功');
})