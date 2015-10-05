'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TaskSchema = new Schema({
  title: String, 
  description: String,
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  created: Date,
  updated: [Date],
  project: {
    type: Schema.ObjectId,
    ref: 'Task'
  }
});

TaskSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

TaskSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator', 'username').exec(cb);
  }
};

/**
 * Methods
 */

TaskSchema.statics.findByTitle = function (title, callback) {
  return this.find({ title: title }, callback);
}

TaskSchema.methods.expressiveQuery = function (creator, date, callback) {
  return this.find('creator', creator).where('date').gte(date).run(callback);
}



function slugGenerator (options){
  options = options || {};
  var key = options.key || 'title';

  return function slugGenerator(schema){
    schema.path(key).set(function(v){
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
};

TaskSchema.plugin(slugGenerator());

mongoose.model('Task', TaskSchema);



