'use strict';

var _ = require('underscore');
var mongoose = require('mongoose'),
  Item = mongoose.model('Item');

exports.load = function(req, res, next, id) {
  Item.load(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new Error('Failed to load item ' + id));
    req.item = item;
    next();
  });
};

exports.create = function(req, res) {
  console.log(req.body);
  var item = new Item(req.body);
  item.creator = req.user;

  item.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(item);
    }
  });
};

exports.update = function(req, res) {
  Item.findById(req.params.itemId).populate('creator team').exec(function(err, item) {
    if (err) {
      res.status(500).json(err);
    } 
    else {
      item = _.extend(item, req.body);
      item.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(item);
        }
      });
    }
  });
};

exports.destroy = function(req, res) {
  var item = req.item;

  item.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(item);
    }
  });
};

exports.show = function(req, res) {
  Item.findById(req.params.itemId).populate('creator').exec( function(err, item) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(item);
    }
  });
};

exports.all = function(req, res) {
  console.log(req.params, req.session);
  Item.find({creator:req.params.user}).sort('-created').populate('creator').exec(function(err, items) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(items);
    }
  });
};