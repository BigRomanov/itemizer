'use strict';

var _ = require('underscore');
var mongoose = require('mongoose'),
  Project = mongoose.model('Project');

exports.load = function(req, res, next, id) {
  Project.load(id, function(err, project) {
    if (err) return next(err);
    if (!project) return next(new Error('Failed to load project ' + id));
    req.project = project;
    next();
  });
};

exports.create = function(req, res) {
  var project = new Project(req.body);
  project.creator = req.user;

  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(project);
    }
  });
};

exports.update = function(req, res) {
  Project.findById(req.params.projectId).populate('creator team').exec(function(err, project) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      project = _.extend(project, req.body);
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
  Project.findById(req.params.projectId).populate('creator team').exec( function(err, project) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(project);
    }
  });
};

exports.all = function(req, res) {
  console.log(req.params, req.session);
  Project.find({team:req.params.teamId}).sort('-created').populate('creator team').exec(function(err, projects) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(projects);
    }
  });
};