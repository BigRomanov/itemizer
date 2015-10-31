'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TaskSchema = new Schema({
    title: String,
    description: String,
    complete: Boolean,
    due_date: Date,
    project: {
      type: Schema.ObjectId,
      ref: 'Project'
    },
    assigned_to: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    assigned_by: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    completed_date: Date,
    completed_by: {
      type: Schema.ObjectId,
      ref: 'User'
    }
});

TaskSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

TaskSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator' ).exec(cb);
  }
};

var Task = mongoose.model('Task', TaskSchema);



