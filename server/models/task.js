'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TaskSchema = new Schema({

  project: {
    type: Schema.ObjectId,
    ref: 'Project'
  },
  title: String,
  description: String,
  complete: Boolean,
  due_date: Date,
  assignee: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  assigned_to: String,

  completed_date: Date,
  completed_by: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

TaskSchema.pre('save', function(next, done) {
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

TaskSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator project').exec(cb);
  }
};

mongoose.model('Task', TaskSchema);
