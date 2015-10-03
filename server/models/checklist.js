'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ItemSchema = new Schema({
  title: String
});

var ChecklistSchema = new Schema({
  title: String, 
  items: [ItemSchema]
});

var Checklist = mongoose.model('Checklist', ChecklistSchema);
var Item = mongoose.model('Item', ItemSchema);
