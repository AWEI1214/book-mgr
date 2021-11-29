import {message} from "ant-design-vue"

export const result = (res,authShowErrorMsg = true)=>{
  const {data} = res;

  if((data.code === 0)&& authShowErrorMsg){
    message.error(data.msg)
  };

 return {
   success(cb){
     if(data.code !==0){
      cb(data);
     }

     return this;
   },
   fail(cb){
     if(data.code ===0){
       cb(data,res)
     }

     return this;
   },
   finally(cb){
     cb(data,res);

     return this;
   },
 }

}