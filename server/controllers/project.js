'use strict';

var mongoose = require('mongoose'),
  Project = mongoose.model('Project');

/**
 * Find checklist by id
 */
exports.checklist = function(req, res, next, id) {
  Project.load(id, function(err, project) {
    if (err) return next(err);
    if (!project) return next(new Error('Failed to load checklist ' + id));
    req.project = project;
    next();
  });
};

exports.create = function(req, res) {
  var checklist = new Project(req.body);
  project.creator = req.user;

  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(checklist);
    }
  });
};

exports.update = function(req, res) {
  
  Project.findById(req.params.projectId, function(err, project) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      // Copy all fields
      project.title = req.body.title;
      project.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(project);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  console.log("Destroy")
  var project = req.project;

  project.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(project);
    }
  });
};

exports.show = function(req, res) {
  Project.findById(req.params.projectId, function(err, project) {
    console.log(err, project);
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(project);
    }
  });
};

exports.all = function(req, res) {
  Project.find().sort('-created').populate('creator', 'username').exec(function(err, projects) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(projects);
    }
  });
};