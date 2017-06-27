const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDb = require('./seeds');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');
const methodOverride = require('method-override');
const flash = require('connect-flash');


mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/yelp_camp',{ useMongoClient: true });
//mongoose.connect('mongodb://TheDude:HeyNow@ds139352.mlab.com:39352/yelpcampthedudeversion',{ useMongoClient: true });

var url = 'mongodb://TheDude:HeyNow@ds139352.mlab.com:39352/yelpcampthedudeversion';
MongoClient.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);

   // do some work here with the database.

   //Close connection
   db.close();
 }
});

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());

//seedDb();

//PASSWORD CONFIGURATION
app.use(require('express-session')({
  secret:'You nibbas think you are better than me.',
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});



//requiring routs
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

//process.env.PORT,process.env.IP
app.listen(process.env.PORT||3000,process.env.IP,function(){
  console.log('HHHHHHHHHHHHHHHH');
});
