'use strict';

var mongoose = require('mongoose'),
  Activity = mongoose.model('Activity');

exports.load = function(req, res, next, id) {
  Activity.load(id, function(err, activity) {
    if (err) return next(err);
    if (!activity) return next(new Error('Failed to load activity ' + id));
    req.activity = activity;
    next();
  });
};

exports.create = function(req, res) {
  var activity = new Activity(req.body);
  activity.creator = req.user;

  activity.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(activity);
    }
  });
};

exports.update = function(req, res) {
  Activity.findById(req.params.activityId, function(err, activity) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      // Copy all fields
      activity.title = req.body.title;
      activity.type = req.body.type;
      activity.watchers = req.body.watchers;
      activity.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(activity);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var activity = req.activity;

  activity.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(activity);
    }
  });
};

exports.show = function(req, res) {
  Activity.findById(req.params.activityId, function(err, activity) {
    console.log(err, activity);
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(activity);
    }
  });
};

exports.all = function(req, res) {
  Activity.find().sort('-created').populate('creator', 'username').exec(function(err, activitys) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(activitys);
    }
  });
};