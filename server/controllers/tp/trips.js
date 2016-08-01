'use strict';

var _ = require('underscore');
var mongoose = require('mongoose'),
  Trip = mongoose.model('Trip');

exports.load = function(req, res, next, id) {
  Trip.load(id, function(err, trip) {
    if (err) return next(err);
    if (!trip) return next(new Error('Failed to load trip ' + id));
    req.trip = trip;
    next();
  });
};

exports.create = function(req, res) {
  var trip = new Trip(req.body);
  trip.creator = req.user;

  trip.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.update = function(req, res) {
  Trip.findById(req.params.tripId).populate('creator').exec(function(err, trip) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      trip = _.extend(trip, req.body);
      trip.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(trip);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var trip = req.trip;

  trip.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.show = function(req, res) {
  Trip.findById(req.params.tripId).populate('creator').exec( function(err, trip) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.all = function(req, res) {
  console.log(req.params, req.session);
  //Trip.find({team:req.params.teamId}).sort('-created').populate('creator').exec(function(err, trips) {
  Trip.find({team:req.params.teamId}).sort('-created').exec(function(err, trips) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(trips);
    }
  });
};