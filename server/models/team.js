'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TeamSchema = new Schema({
  title: String, 
  members: [{ 
    type: Schema.ObjectId,
    ref: 'User'
  }],
  invites: [{email: String, invited: Date, status: String}], // list of invited users
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

TeamSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

TeamSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator members' ).exec(cb);
  }
};


TeamSchema.statics.findByTitle = function (title, callback) {
  return this.find({ title: title }, callback);
}

TeamSchema.methods.expressiveQuery = function (creator, date, callback) {
  return this.find('creator', creator).where('date').gte(date).run(callback);
}



var Team = mongoose.model('Team', TeamSchema);



