'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var OrganizationSchema = new Schema({
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

OrganizationSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

OrganizationSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator members' ).exec(cb);
  }
};


OrganizationSchema.statics.findByTitle = function (title, callback) {
  return this.find({ title: title }, callback);
}

OrganizationSchema.methods.expressiveQuery = function (creator, date, callback) {
  return this.find('creator', creator).where('date').gte(date).run(callback);
}



var Organization = mongoose.model('Organization', OrganizationSchema);



