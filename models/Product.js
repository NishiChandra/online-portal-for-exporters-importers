var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/capstone");
var exp=require('../models/Exporter.js');
console.log(exp);
var productSchema = new mongoose.Schema(
  {
      productName:{type:String,max:100},
      expId:{type:Number},
     productImage:{type:String},
	   price: {type:Number},
	   quantity: {type:Number},
	   category:{type:String},
	   description:{type:String,max:100}
  }, {collection: 'Product'});
  
 
autoIncrement.initialize(connection);
productSchema.plugin(autoIncrement.plugin, {
    model: 'Product',
    field: 'productId',
    startAt: 300,
    incrementBy: 1
});
module.exports = mongoose.model('Product', productSchema);


