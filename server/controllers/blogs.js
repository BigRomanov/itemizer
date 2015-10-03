'use strict';

var mongoose = require('mongoose'),
  Blog = mongoose.model('BlogPost');

/**
 * Find blog by id
 */
exports.blog = function(req, res, next, id) {
  Blog.load(id, function(err, blog) {
    if (err) return next(err);
    if (!blog) return next(new Error('Failed to load blog ' + id));
    req.blog = blog;
    next();
  });
};

/**
 * Create a blog
 */
exports.create = function(req, res) {
  var blog = new Blog(req.body);
  blog.creator = req.user;

  blog.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(blog);
    }
  });
};

/**
 * Update a blog
 */
exports.update = function(req, res) {
  var blog = req.blog;
  blog.title = req.body.title;
  blog.content = req.body.content;
  blog.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(blog);
    }
  });
};

/**
 * Delete a blog
 */
exports.destroy = function(req, res) {
  var blog = req.blog;

  blog.remove(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(blog);
    }
  });
};

/**
 * Show a blog
 */
exports.show = function(req, res) {
  res.status(200).json(blog);
};

/**
 * List of Blogs
 */
exports.all = function(req, res) {
  Blog.find().sort('-created').populate('creator', 'username').exec(function(err, blogs) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(blog);
    }
  });
};
