const auth = require('./auth/index')
const invite = require('./invite-code/index')
const book = require('./book/index')
const inventoryLog = require('./inventory-log/index')
const user = require('./user/index')
module.exports =(app)=>{
  app.use(auth.routes());
  app.use(invite.routes());
  app.use(book.routes());
  app.use(inventoryLog.routes());
  app.use(user.routes());
}