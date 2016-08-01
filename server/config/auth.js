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


// General auth
exports.workspace = {
  hasAuthorization: function(req, res, next) {
    if (req.workspace.user._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(403);
    }
    next();
  }
};

exports.item = {
  hasAuthorization: function(req, res, next) {
    if (req.item.creator._id.toString() !== req.user._id.toString()) {
      return res.sendStatus(403);
    }
    next();
  }
};

// Trip planner auth
exports.trip = {
  hasAuthorization: function(req, res, next) {
    if (req.trip.user._id.toString() !== req.user._id.toString()) {
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
