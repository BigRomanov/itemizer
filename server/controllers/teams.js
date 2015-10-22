'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var Team = mongoose.model('Team');

exports.load = function(req, res, next, id) {
  Team.load(id, function(err, team) {
    if (err) return next(err);
    if (!team) return next(new Error('Failed to load team ' + id));
    req.team = team;
    next();
  });
};

exports.create = function(req, res) {
  var team = new Team(req.body);
  team.creator = req.user;

  team.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(team);
    }
  });
};

exports.update = function(req, res) {
  
  Team.findById(req.params.teamId, function(err, team) {
    console.log(err);
    if (err) {
      res.status(500).json(err);
    } 
    else {
      // Copy all fields
      team = _.extend(team, req.body);
      // team.title = req.body.title;
      // team.invites = req.body.invites;
      // team.members = req.body.members;
      team.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(team);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var team = req.team;

  team.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(team);
    }
  });
};

exports.show = function(req, res) {
  Team.findById(req.params.teamId).populate('creator members invites').exec(function(err, team) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(team);
    }
  });
};

exports.all = function(req, res) {
  Team.find().sort('-created').populate('creator members invites').exec(function(err, teams) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(teams);
    }
  });
};