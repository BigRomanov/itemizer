'use strict';

var mongoose = require('mongoose'),
  passport = require('passport');

/**
 * Session
 * returns info on authenticated user
 */
exports.session = function (req, res) {
  res.status(200).json(req.user.user_info);
};

/**
 * Logout
 * returns nothing
 */
exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
};

/**
 *  Login
 *  requires: {email, password}
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) { 
      return res.status(400).json(error); 
    }
    req.logIn(user, function(err) {
      if (err) { return res.send(err); }
      res.status(200).json(req.user.user_info);
    });
  })(req, res, next);
}