//  Import modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//  Function to check password
function findAndComparePassword(username, password, done) {
  //  Find user by username, from model
  User.findByUsername(username).then(function(user) {
    if (!user) {
      //  Did not find user
      return done(null, false);
    }

    //  Compare password, from models
    User.comparePassword(user, password).then(function(isMatch) {
      if (isMatch) {
        done(null, user);
      } else {
        done(null, false);
      }
    });

  }).catch(function(err){
    console.log('Error finding user:', err);
    done(err);
  });
}

//  Export setup
exports.setup = function() {
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, findAndComparePassword));

  //  Convert user to user ID
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //  Convert user ID to user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      done(null, user);
    }).catch(function(err) {
      done(err);
    });
  });
}
