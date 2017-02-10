var express = require('express');
var express = require('express');
var expstate = require('express-state');
var passport = require('passport');
var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
var app = express();
expstate.extend(app);
var token = {};

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FitbitStrategy({
        clientID:     '227WJ3',
        clientSecret: '515f980d6e0b171d90026ea3581fade3',
        callbackURL: 'http://localhost:3000/profile'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('f')
        done(null, token= {accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile});
        console.log('ttttttt'+token.accessToken);
    }
));


/* GET home page. */


app.get('/',
    passport.authenticate('fitbit', { failureRedirect: '/login' }),
    function(req, res) { 
    	console.log('ppppppppp'+token.accessToken);
        res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\profile.html');
        
    }
);

app.get('/token',function(req,res){
  res.send(token);
})


module.exports = app;
