'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var BetaRegistrationSchema = new Schema({
  email: { type: String, index: { unique: true }},
  status: String,
  created: Date,
  updated: [Date],

});

BetaRegistrationSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

BetaRegistrationSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).exec(cb);
  }
};

mongoose.model('BetaRegistration', BetaRegistrationSchema);



