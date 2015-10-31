'use strict';

var _ = require('underscore');
var mongoose = require('mongoose'),
  Task = mongoose.model('Task');

exports.load = function(req, res, next, id) {
  Task.load(id, function(err, task) {
    if (err) return next(err);
    if (!task) return next(new Error('Failed to load task ' + id));
    req.task = task;
    next();
  });
};

exports.create = function(req, res) {
  var task = new Task(req.body);
  task.creator = req.user;

  task.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(task);
    }
  });
};

exports.update = function(req, res) {
  
  Task.findById(req.params.taskId, function(err, task) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      task = _.extend(task, req.body);
      task.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(task);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var task = req.task;

  task.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(task);
    }
  });
};

exports.show = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(task);
    }
  });
};

exports.all = function(req, res) {
  Task.find(req.params.teamId).sort('-created').populate('creator project').exec(function(err, tasks) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(tasks);
    }
  });
};