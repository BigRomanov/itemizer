'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated");
  if (req.isAuthenticated()) { 
    console.log("authenticated");
    return next(); 
  }
  res.send(401);
}

/**
 * Blog authorizations routing middleware
 */
exports.blog = {
  hasAuthorization: function(req, res, next) {
    if (req.blog.creator._id.toString() !== req.user._id.toString()) {
      return res.send(403);
    }
    next();
  }
};

exports.checklist = {
  hasAuthorization: function(req, res, next) {
    console.log("hasAuthorization");
    console.log(req.checklist);
    console.log(req.user);
    if (req.checklist.creator.toString() !== req.user._id.toString()) {
      return res.send(403);
    }
    console.log("authorized");
    next();
  }
};