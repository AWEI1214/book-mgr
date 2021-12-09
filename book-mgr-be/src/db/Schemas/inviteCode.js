const mongoose = require('mongoose');
const {getMeta,perSave} = require('../helpers')
const InviteCodeSchema = new mongoose.Schema({
  //邀请码
  code:String,
  //用来注册哪些用户
  user:String,
  
  meta:getMeta()

});
InviteCodeSchema.pre('save',perSave)
mongoose.model('InviteCode',InviteCodeSchema)
