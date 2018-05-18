var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer  = require('multer');
var Product = require('../models/Product.js');
var Exporter = require('../models/Exporter.js');
/*
var storage=multer.diskStorage({
destination:function(req, file, cb) {
    cb(null, './uploads/');
  },
filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload=multer({
  storage:storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
*/
router.get('/',function(req, res, next) {

      res.render('exproduct');
 });
//upload.single('pImage')
router.post('/',function(req, res, next) {  
  var item = {
  	productName:req.body.pName ,
   // expId: info,
    //productImage:req.upload.pImage,
	price:req.body.price,
	quantity:req.body.quantity ,
	category:req.body.Category,
	description:req.body.pDesc
	};

Product.create(item)
.then(item => {
	console.log('Created');
 res.render('exphome');
 }).catch(err => {
 	console.log(err);
 res.status(400).send("unable to save data");
 });
});

module.exports=router;
