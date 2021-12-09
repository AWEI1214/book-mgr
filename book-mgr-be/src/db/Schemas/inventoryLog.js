const mongoose = require('mongoose');
const {getMeta,perSave} = require('../helpers')
const InventoryLogSchema = new mongoose.Schema({
  type:String,
  num:Number,
  user:String,

  meta:getMeta()
});

InventoryLogSchema.pre('save',perSave)

mongoose.model('InventoryLog',InventoryLogSchema)
