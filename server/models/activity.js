'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var ActivitySchema = new Schema({
  title: String, 
  type: String,
  project: {
    type: Schema.ObjectId,
    ref: 'Project'
  },
  task: {
    type: Schema.ObjectId,
    ref: 'Task'
  },
  watchers: [{ 
    type: Schema.ObjectId,
    ref: 'User'
  }],
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

ActivitySchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

ActivitySchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator watchers' ).exec(cb);
  }
};


var Activity = mongoose.model('Activity', ActivitySchema);



