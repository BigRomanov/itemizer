'use strict';

var mongoose = require('mongoose'),
  BetaRegistration = mongoose.model('BetaRegistration');

exports.create = function(req, res) {
  var br = new BetaRegistration(req.body);

  br.save(function(err) {
    if (err) {
      if (err.code == 11000) { // duplicate key, not and error
        res.cookie('registered',1, { maxAge: 900000, httpOnly: true });
        res.status(200).json(br);
      }
      else
        res.status(500).json(err);
    } else {
      res.cookie('registered',1, { maxAge: 900000, httpOnly: true });
      res.status(200).json(br);
    }
  });
};

