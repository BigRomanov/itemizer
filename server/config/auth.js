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
  res.sendStatus(401);
}

/**
 * Blog authorizations routing middleware
 */
exports.blog = {
  hasAuthorization: function(req, res, next) {
    if (req.blog.creator._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(403);
    }
    next();
  }
};

exports.checklist = {
  hasAuthorization: function(req, res, next) {
    if (req.checklist.creator._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(403);
    }
    next();
  }
};

exports.project = {
  hasAuthorization: function(req, res, next) {
    if (req.project.creator._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(403);
    }
    next();
  }
};

exports.task = {
  hasAuthorization: function(req, res, next) {
    
    // TODO: Implement authorization in which only team members can see the task

    // if (req.task.creator._id.toString() !== req.user._id.toString()) {
    //   return res.sendStatus(403);
    // }
    next();
  }
};

exports.team = {
  hasAuthorization: function(req, res, next) {
    if (req.team.creator._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(403);
    }
    next();
  }
};

exports.activity = {
  hasAuthorization: function(req, res, next) {
    if (req.activity.creator._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(403);
    }
    next();
  }
};
