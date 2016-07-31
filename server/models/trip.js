'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TripSchema = new Schema({
  title: String, 
  created: Date,
  updated: [Date],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

TripSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

TripSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('user').exec(cb);
  }
};


TripSchema.statics.findByTitle = function (title, callback) {
  return this.find({ title: title }, callback);
}

mongoose.model('Trip', TripSchema);



