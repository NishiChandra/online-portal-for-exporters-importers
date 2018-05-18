var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/mainreg',function(req, res, next) {
  res.render('mainreg');
});

module.exports = router;