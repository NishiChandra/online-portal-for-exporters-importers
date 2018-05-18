var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/capstone");
var exp=require('../models/Exporter.js');
console.log(exp);
var orderSchema = new mongoose.Schema(
  {
     status:{type:String},
     email:{type:String},
     address:{type:String},
     cart:{type:Object,ref:'Cart'},
     modeofpayment:{type:String}
  }, {collection: 'Orders'});
  
 
autoIncrement.initialize(connection);
orderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderid',
    startAt: 500,
    incrementBy: 1
});
module.exports = mongoose.model('Order', orderSchema);


