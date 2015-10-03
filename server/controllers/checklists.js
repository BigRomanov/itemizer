'use strict';

var mongoose = require('mongoose'),
  Checklist = mongoose.model('Checklist');

/**
 * Find checklist by id
 */
exports.checklist = function(req, res, next, id) {
  Checklist.load(id, function(err, blog) {
    if (err) return next(err);
    if (!blog) return next(new Error('Failed to load blog ' + id));
    req.checklist = checklist;
    next();
  });
};

/**
 * Create a checklist
 */
exports.create = function(req, res) {
  var checklist = new Checklist(req.body);
  checklist.creator = req.user;

  checklist.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(checklist);
    }
  });
};

/**
 * Update a checklist
 */
exports.update = function(req, res) {
  var checklist = req.checklist;
  checklist.title = req.body.title;
  checklist.items = req.body.items;
  checklist.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(checklist);
    }
  });
};

/**
 * Delete a checklist
 */
exports.destroy = function(req, res) {
  var checklist = req.checklist;

  checklist.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(checklist);
    }
  });
};

/**
 * Show a checklist
 */
exports.show = function(req, res) {
  res.json(req.checklist);
};

/**
 * List of checklists
 */
exports.all = function(req, res) {
  Checklist.find().sort('-created').populate('creator', 'username').exec(function(err, checklists) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(checklists);
    }
  });
};
