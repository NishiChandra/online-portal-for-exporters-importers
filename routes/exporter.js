var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exporter = require('../models/Exporter.js');
var Order=require('../models/Order.js');
var Cart=require('../models/Cart.js')
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));
var db=mongoose.connection;


router.get('/', function(req, res, next) {
      res.render('expreg',{});
 });
router.get('/exphome', function(req, res, next) {
      res.render('exphome');
 });

router.get('/exporder', function(req, res, next) {
  Order.find({},function(err,orders) {
    if(err)
    {
      return res.write('Error');
    }
    var cart;
    orders.forEach(function(order){
      cart=new Cart(order.cart);
      order.items=cart.generateArray();
    });
      res.render('exporder',{orders: orders}); 
  });
     
 });

/*router.get('/exprofile', function(req, res, next) {
      res.render('exprofile');
 });*/
router.get('/exproduct', function(req, res, next) {
      res.render('exproduct');
 });

router.post('/insert', function(req, res, next) {
var password = req.body.pwd;
var password2 = req.body.rptpwd;
var e=(password == password2);


if(!e)
{
  req.flash('error_msg','Passwords Do not Match try again !');
  req.render('expreg');
}  
  else
  {
  var item = {
  	utype: req.body.category,
  	company:req.body.comp,
  	businessReg:req.body.breg,
  	country: req.body.country,
	Address: req.body.address,
    firstName: req.body.fname,
    secondName: req.body.lname,
	emailId	:req.body.eID,
	pword: req.body.pwd,
	
	};

exporter.create(item).then(item => {
 req.flash('success_msg', 'You are registered and can now login');
 res.render('signin');
 }).catch(err => {
 	console.log(err);
 res.status(400).send("unable to save data");
 });
}
});

module.exports=router;
