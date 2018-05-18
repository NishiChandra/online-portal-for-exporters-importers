var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/capstone");
var importerSchema = new mongoose.Schema(
  {
  	utype: {type:String},
    firstName: {type: String,  max: 30},
    secondName: {type: String,max: 30},
	emailId: {type:String,max: 30},
	pword: {type:String,max:20},
	repeatpword:{type:String,max:20}
  }, {collection: 'Importers'});

autoIncrement.initialize(connection);
importerSchema.plugin(autoIncrement.plugin, {
    model: 'Importer',
    field: 'importerId',
    startAt: 100,
    incrementBy: 1
});
module.exports = mongoose.model('Importer', importerSchema);


