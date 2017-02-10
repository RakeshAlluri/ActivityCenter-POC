var http = require('http')
var passport = require('passport');
var express = require('express');
var expstate = require('express-state');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;

var index = require('./routes/index');
var activityCenter = require('./routes/activityCenter');
var test = require('./test');


var app = express();
expstate.extend(app);
app.set('state namespace', 'MY_APP');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/ltf');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});



app.use('/', index);
app.use('/activityCenter', activityCenter);
app.use('/test',test);


var token = {};

passport.use(new FitbitStrategy({
        clientID:     '',
        clientSecret: '',
        callbackURL: 'http://localhost:3000/profile'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('f')
        done(null, token= {accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile});
    }
));



app.get('/authorize',
    passport.authenticate('fitbit', {scope: ['weight', 'profile','activity','heartrate','location','nutrition','settings','sleep','social']}),
    function(req,res){
      console.log('a',req,res);
    });

app.get('/profile',
    passport.authenticate('fitbit', { failureRedirect: '/login' }),
    function(req, res) { 
        res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\profile.html');
        
    }
);

app.get('/token',function(req,res){
  res.send(token);
})



console.log('app.js file')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.token =  function(){
  return token;
};

module.exports = app;

