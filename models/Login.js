var mongoose = require('mongoose');
var loginSchema = new mongoose.Schema(
  {
    utype: {type:String},
    emailId: {type:String,max: 30},
    pword: {type:String,max:20}
 
  }, {collection: 'Login'});
  
module.exports = mongoose.model('Login', loginSchema);