'use strict';

var _ = require('underscore');
var mongoose = require('mongoose'),
  Workspace = mongoose.model('Workspace');

exports.load = function(req, res, next, id) {
  Workspace.load(id, function(err, workspace) {
    if (err) return next(err);
    if (!workspace) return next(new Error('Failed to load workspace ' + id));
    req.workspace = workspace;
    next();
  });
};

exports.create = function(req, res) {
  var workspace = new Workspace(req.body);
  workspace.user = req.user;

  workspace.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(workspace);
    }
  });
};

exports.update = function(req, res) {
  Workspace.findById(req.params.projectId).populate('user').exec(function(err, workspace) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      workspace = _.extend(workspace, req.body);
      workspace.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(workspace);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var workspace = req.workspace;

  workspace.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(workspace);
    }
  });
};

exports.show = function(req, res) {
  Workspace.findById(req.params.projectId).populate('user').exec( function(err, workspace) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(workspace);
    }
  });
};

exports.all = function(req, res) {
  console.log(req.params, req.session);
  Workspace.find({team:req.params.teamId}).sort('-created').populate('creator team').exec(function(err, projects) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(projects);
    }
  });
};