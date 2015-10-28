'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Team = mongoose.model('Team'),
  passport = require('passport'),
  ObjectId = mongoose.Types.ObjectId;

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

  newUser.save(function(err) {
    if (err) {
      return res.status(400).json(err);
    }

    req.logIn(newUser, function(err) {
      if (err) return next(err);

      // Create Peronal project team for the user
      var team = new Team({
        title: 'Personal projects',
        default: true,
        members: [newUser],
        creator: newUser
      });

      team.save(function(err, team) {
        if (err) {
          res.status(500).json(err);
        } else {
          // Set team as current team for the user
          User.update({
            _id: newUser._id
          }, {
            currentTeam: {
              _id: team._id
            }
          }, function(err) {
            if (err) {
              return next(new Error('Failed to load User'));
            } else {
              return res.status(200).json(newUser.user_info);
            }
          });

        }
      });
    });
  });
};

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = function(req, res, next) {
  var userId = req.params.userId;

  User.findById(ObjectId(userId)).populate('teams').exec(function(err, user) {
    if (err) {
      return next(new Error('Failed to load User'));
    }
    if (user) {
      res.send({
        username: user.username,
        profile: user.profile
      });
    } else {
      res.send(404, 'USER_NOT_FOUND')
    }
  });
};

exports.setTeam = function(req, res, next) {
  var userId = req.body.userId;
  var teamId = req.body.teamId;
  var teamTitle = req.body.teamTitle;

  console.log(req.body);
  console.log(userId, teamId, teamTitle);

  User.update({
    _id: userId
  }, {
    currentTeam: {
      _id: teamId
    }
  }, function(err) {
    if (err) {
      console.log(err);
      return next(new Error('Failed to load User'));
    } else {
      console.log("Current team set successfully")
      res.status(200).json({
        currentTeam: {
          id: teamId,
          title: teamTitle
        }
      });
    }
  });
};

/**
 *  Username exists
 *  returns {exists}
 */
exports.exists = function(req, res, next) {
  var username = req.params.username;
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      return next(new Error('Failed to load User ' + username));
    }

    if (user) {
      res.status(200).json({
        exists: true
      });
    } else {
      res.status(200).json({
        exists: false
      });
    }
  });
}
