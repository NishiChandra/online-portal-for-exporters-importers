var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStratergy=require('passport-local').Strategy;
var importer = require('../models/Importer.js');
var impLogin=require('../models/Login.js');
var Product=require('../models/Product.js');
var Cart=require('../models/Cart.js');
var Order=require('../models/Order.js');
router.get('/', function(req, res, next) {
      res.render('impreg');
 });

router.get('/imphome', function(req, res, next) {
      res.render('imphome');
 });
router.get('/improducts', function(req, res, next) {
      Product.find(function(err,docs)
      {
        var productChunks = [];
        var chunkSize=3;
        for(var i=0;i < docs.length;i += chunkSize){
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('improducts',{title:'Place Orders',products:productChunks });
      });
      
 });
router.get('/implist', function(req, res, next) {
      res.render('implist');
 });

router.get('/addtocart/:id', function(req, res, next) {
      var productId=req.params.id;
      var cart=new Cart(req.session.cart ? req.session.cart : {item:{}});
      Product.findById(productId,function(err,product){
        if(err){
          return res.redirect('/imphome');
        }
        cart.add(product,product.id);
        req.session.cart=cart;
        console.log(req.session.cart);
         res.redirect('/importer/improducts');

      })

 });

router.get('/shoppingcart',function(req,res,next){
  if(!req.session.cart){
    return res.render('shoppingcart',{products:null});
  }
  var cart=new Cart(req.session.cart);
  res.render('shoppingcart',{products:cart.generateArray(),totalPrice:cart.totalPrice});
});
router.get('/checkout',function(req,res,next){
  if(!req.session.cart){
    return res.render('shoppingcart',{products:null});
  }
var cart=new Cart(req.session.cart);
res.render('checkout',{total:cart.totalPrice});
});


router.post('/checkout', function(req, res, next) {
  var cart=new Cart(req.session.cart);
  var item = {
  status: req.body.status,
  email:req.body.eID,
  address: req.body.address,
  cart:cart,
  modeofpayment:req.body.payment
  };

Order.create(item).then(item => {
  req.flash('success','successfully bought product');
   res.render('imphome');
 }).catch(err => {
  console.log(err);
 res.status(400).send("unable to save data");
 });

});

router.post('/insert', function(req, res, next) {

var password = req.body.pwd;
var password2 = req.body.rptpwd;
var e=(password == password2);
if(!e)
{
  req.flash('error_msg','Password do not match');
  res.render('impreg');
}  
else
{
  var item = {
  	utype: req.body.category,
    firstName:req.body.fname,
    secondName: req.body.lname,
	emailId	:req.body.eID,
	pword: req.body.pwd,
	country: req.body.Country,
	Address: req.body.address
	};

importer.create(item).then(item => {
   res.render('signin');
 }).catch(err => {
 	console.log(err);
 res.status(400).send("unable to save data");
 });
}
});


module.exports=router;
