'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TeamInviteSchema = new Schema({
  email: String,
  team: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  status: String,
  created: Date,
  updated: [Date]

});

TeamInviteSchema.index({ email: 1, team: 1}, { unique: true });

TeamInviteSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

TeamInviteSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).exec(cb);
  }
};

TeamInviteSchema.statics.findByEmail = function (email, callback) {
  return this.find({ email: email }, callback);
}

mongoose.model('TeamInvite', TeamInviteSchema);



