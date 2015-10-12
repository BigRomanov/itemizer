'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var TeamInvite = mongoose.model('TeamInvite');

exports.load = function(req, res, next, id) {
  TeamInvite.load(id, function(err, invite) {
    if (err) return next(err);
    if (!invite) return next(new Error('Failed to load team invite ' + id));
    req.invite = invite;
    next();
  });
};

exports.create = function(req, res) {
  var invite = new TeamInvite(req.body);
  invite.creator = req.user;

  invite.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(invite);
    }
  });
};

exports.update = function(req, res) {
  
  TeamInvite.findById(req.params.inviteId, function(err, invite) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      // Copy all fields
      invite = _.extend(invite, req.body);
      
      invite.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(invite);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var invite = req.invite;

  invite.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(invite);
    }
  });
};

exports.show = function(req, res) {
  TeamInvite.findById(req.params.teamId).populate('creator team').exec(function(err, invite) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(invite);
    }
  });
};

exports.all = function(req, res) {
  TeamInvite.find().sort('-created').populate('creator team').exec(function(err, invites) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(invites);
    }
  });
};