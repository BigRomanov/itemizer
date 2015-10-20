'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  ObjectId = mongoose.Types.ObjectId;

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

  newUser.save(function(err) {
    if (err) {
      return res.status(400).json(err);
    }

    req.logIn(newUser, function(err) {
      if (err) return next(err);
      return res.status(200).json(newUser.user_info);
    });
  });
};

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = function (req, res, next) {
  var userId = req.params.userId;

  User.findById(ObjectId(userId)).populate('teams').exec(function (err, user) {
    if (err) {
      return next(new Error('Failed to load User'));
    }
    if (user) {
      res.send({username: user.username, profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND')
    }
  });
};

exports.setTeam = function (req, res, next) {
  var userId = req.body.userId;
  var teamId = req.body.teamId;
  var teamTitle = req.body.teamTitle; 

  console.log(req.body);
  console.log(userId, teamId, teamTitle);

  User.update({_id:userId},{currentTeam:{id:teamId, title:teamTitle}}, function (err) {
    if (err) {
      console.log(err);
      return next(new Error('Failed to load User'));
    }
    else {
      console.log("Current team set successfully")
      res.status(200).json({currentTeam:{id:teamId, title:teamTitle}});
    }
  });
};

/**
 *  Username exists
 *  returns {exists}
 */
exports.exists = function (req, res, next) {
  var username = req.params.username;
  User.findOne({ username : username }, function (err, user) {
    if (err) {
      return next(new Error('Failed to load User ' + username));
    }

    if(user) {
      res.status(200).json({exists: true});
    } else {
      res.status(200).json({exists: false});
    }
  });
}
