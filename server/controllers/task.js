'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Task');

/**
 * Find task by id
 */
exports.task = function(req, res, next, id) {
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
      // Copy all fields
      task.title = req.body.title;
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
  console.log("Destroy")
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
    console.log(err, task);
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(task);
    }
  });
};

exports.all = function(req, res) {
  Task.find().sort('-created').populate('creator', 'username').exec(function(err, tasks) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(tasks);
    }
  });
};