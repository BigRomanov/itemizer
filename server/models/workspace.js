'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var WorkspaceSchema = new Schema({
  title: String, 
  created: Date,
  updated: [Date],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

WorkspaceSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

WorkspaceSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('user').exec(cb);
  }
};

WorkspaceSchema.statics.findByTitle = function (title, callback) {
  return this.find({ title: title }, callback);
}


mongoose.model('Workspace', WorkspaceSchema);



