'use strict';

var mongoose = require('mongoose'),
  Checklist = mongoose.model('Checklist');

/**
 * Find checklist by id
 */
exports.checklist = function(req, res, next, id) {
  Checklist.findById(id, function(err, checklist) {
    if (err) return next(err);
    if (!checklist) return next(new Error('Failed to load blog ' + id));
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
      res.status(500).json(err);
    } else {
      res.status(200).json(checklist);
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
      res.status(500).json(err);
    } else {
      res.status(200).json(checklist);
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
      res.status(500).json(err);
    } else {
      res.status(200).json(checklist);
    }
  });
};

/**
 * Show a checklist
 */
exports.show = function(req, res) {
  console.log(req.params);
  Checklist.findById(req.params.checklistId, function(err, checklist) {
    console.log(err, checklist);
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(checklist);
    }
  });
};

/**
 * List of checklists
 */
exports.all = function(req, res) {
  console.log("Find all checklists");
  Checklist.find().sort('-created').populate('creator', 'username').exec(function(err, checklists) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(checklists);
    }
  });
};
