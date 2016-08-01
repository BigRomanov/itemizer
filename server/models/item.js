'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var itemSchema = new Schema({
  title: String, 
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, {discriminatorKey: '_type'});

itemSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

mongoose.model('Item', itemSchema);

//module.exports = mongoose.model('items', itemSchema);  