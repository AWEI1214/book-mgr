const getMeta = () =>{
  return{
      createdAt:{
        type:Number,
        default:(new Date()).getTime(),
      },
      updatedAt:{
        type:Number,
        default:(new Date()).getTime(),
      },
  }
}

const perSave = function(next){
  if(this.isNew){
    const ts =Date.now();

    this['meta'].createdAt = ts;
    this['meta'].updatedAt = ts;
  }else{
    this['meta'].updatedAt = Date.now();
  }
  next();
}
module.exports = {
  getMeta,
  perSave
}