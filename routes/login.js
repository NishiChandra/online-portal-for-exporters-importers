var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var importer = require('../models/Importer.js');
var exporter=require('../models/Exporter.js');
var db=mongoose.connection;



router.get('/signin', function(req, res, next) {
      res.render('signin');
 		//res.send("yes")
 });
router.get('/forgotpass', function(req, res, next) {
      res.render('forgotpass');
 		//res.send("yes")
 });


router.post('/login', function(req, res, next) {
	var info=[];
	var e=req.body.email;
	var p=req.body.pwd;
	console.log(e);
	console.log(p);
db.collection('Importers').findOne({ utype:"importer",emailId: e, pword: p}, function(err, doc){
                if(err) throw err;
                if(doc) {
                    console.log("Found: " + e + ", pass=" + p);
                    info.push(doc);
		            console.log(doc);
                    res.render('imphome',{user:info});
                } else {
                    
		                    db.collection('Exporters').findOne({utype: "exporter",emailId:e,pword:p},function(err1,doc)
		                    {
		                    	console.log('exp');
		                    	if(err1) throw err1;
		                    		if(doc)
		                    		{
		                    			console.log('exp1');
		                    			 console.log("Found: " + e + ", pass=" + p);
		                    			 info.push(doc);
		                    			 console.log(doc);
		                    				res.render('exphome',{user:info});
		                    		}
		                    		else{
		                    			console.log('exp2');
		                    			console.log("Not found: " + e);
		                    			res.render('signin');
		                    		}
		                    		console.log('exp3');

		                    });
                    
                	}
                
            });


  });	

module.exports=router;
