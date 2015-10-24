'use strict';

var _ = require('underscore');
var async = require('async');
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
  if (req.body.invites) {
    var emails = req.body.invites.split(",");
    var team = req.body.team;

    var successes  = [];
    var failures   = [];
    var duplicates = [];

    console.log("Create invites for team: ", team, " emails: ", emails);

    async.each(emails, function(email, callback) {

      var invite = new TeamInvite({
        email: email,
        team: team,
        status: "pending"
      });
      invite.creator = req.user;

      invite.save(function(err, _invite) {
        if (err) {
          console.log(err);
          if (err.code == 11000)
            duplicates.push(_invite);
          else
            failures.push(_invite);
        } else {
          successes.push(_invite);
        }

        callback();
      });
    }, function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          successes: successes,
          failures: failures
        });
      }
    });

    _.each(emails, function(email) {

    });
  }
};

exports.update = function(req, res) {

  TeamInvite.findById(req.params.inviteId, function(err, invite) {
    if (err) {
      res.status(500).json(err);
    } else {
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


// TODO: Check if we need this method
exports.findByEmail = function(req, res) {
  var email = req.query.email;
  var status = req.query.status;
  console.log("Find team invite for: ", email, "status: ", status);
  TeamInvite.find({email:email, status:status}).populate('creator team').exec(function(err, invite) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      console.log(invite);
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