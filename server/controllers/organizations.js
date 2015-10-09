'use strict';

var mongoose = require('mongoose'),
  Organization = mongoose.model('Organization');

exports.load = function(req, res, next, id) {
  Organization.load(id, function(err, organization) {
    if (err) return next(err);
    if (!organization) return next(new Error('Failed to load organization ' + id));
    req.organization = organization;
    next();
  });
};

exports.create = function(req, res) {
  var organization = new Organization(req.body);
  organization.creator = req.user;

  organization.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(organization);
    }
  });
};

exports.update = function(req, res) {
  
  Organization.findById(req.params.organizationId, function(err, organization) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      // Copy all fields
      organization.title = req.body.title;
      organization.tasks = req.body.tasks;
      organization.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(organization);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var organization = req.organization;

  organization.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(organization);
    }
  });
};

exports.show = function(req, res) {
  Organization.findById(req.params.organizationId, function(err, organization) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(organization);
    }
  });
};

exports.all = function(req, res) {
  Organization.find().sort('-created').populate('creator', 'username').exec(function(err, organizations) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(organizations);
    }
  });
};