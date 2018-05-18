var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/capstone");
var exporterSchema = new mongoose.Schema(
  {
    utype: {type:String},
    company_name: {type:String},
    business_regno: {type:String},
    country:{type:String,max:100},
    Address:{type:String,max:100},
    firstName: {type: String,  max: 30},
    secondName: {type: String,max: 30},
    emailId: {type:String,max: 30},
    pword: {type:String,max:20}
  }, {collection: 'Exporters'});

autoIncrement.initialize(connection);
exporterSchema.plugin(autoIncrement.plugin, {
    model: 'Exporter',
    field: 'exporterId',
    startAt: 200,
    incrementBy: 1
});

module.exports = mongoose.model('Exporter', exporterSchema);