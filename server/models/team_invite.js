'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TeamInviteSchema = new Schema({
  email: { type: String, index: { unique: true }},
  team: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
  status: String,
  created: Date,
  updated: [Date]

});

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

mongoose.model('TeamInvite', TeamInviteSchema);



