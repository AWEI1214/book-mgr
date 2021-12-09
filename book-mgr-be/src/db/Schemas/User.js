const mongoose = require('mongoose');
const {getMeta,perSave} = require('../helpers')
const UserSchema = new mongoose.Schema({
  account:String,
  password:String,

  meta:getMeta()

});
UserSchema.pre('save',perSave)
mongoose.model('User',UserSchema)
