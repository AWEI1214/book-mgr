var jwt = require('jsonwebtoken');
var token = jwt.sign({
  account:'a.cc.com',
  _id:'123', 
},'shhhhh')

console.log(token);