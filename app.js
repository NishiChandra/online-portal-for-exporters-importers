var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo=require('mongodb');
var mongoose=require('mongoose');
var multer  = require('multer');

//variables for Routes
var importer=require('./routes/importer');
var exporter=require('./routes/exporter');
var login=require('./routes/login');
var product=require('./routes/product');
var routes=require('./routes/index');
var MongoStore=require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/capstone',(err, client) =>	{
		if(!err)
		{
			console.log("connected");
		}
		
		if(err)
		console.log(err);		
});
var db=mongoose.connection;

//Express validator 
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//view engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout',extname:'.handlebars'}));
app.set('view engine','handlebars');
//body parser
//app.use('/uploads', express.static('upload'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store:new MongoStore({mongooseConnection: mongoose.connection}),
    cookie:{maxAge: 80*60*100} 
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  next();
})
// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});




app.use('/importer',importer);
app.use('/exporter',exporter);
app.use('/login',login);
app.use('/product',product);


app.use('/',routes);
app.use('/index',routes);
app.use('/signin',login);
app.use('/mainreg',routes);
app.use('/forgotpass',login);


app.use('/imphome',importer);
app.use('/improducts',importer);

app.use('/exphome',exporter);
app.use('/exporder',exporter);
//app.use('/exprofile',exporter);
app.use('/exproduct',exporter);


app.listen(3000);