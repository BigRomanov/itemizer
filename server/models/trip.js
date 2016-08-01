'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = mongoose.model('Item');

var TripItem = Item.discriminator('Trip',
      new mongoose.Schema({
        from: Date,
        to: Date,
        description: String
      }, {discriminatorKey: '_type'}));


// var TripSchema = new Schema({
//   title: String, 
//   created: Date,
//   updated: [Date],
//   creator: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });

// TripSchema.pre('save', function(next, done){
//   if (this.isNew)
//     this.created = Date.now();

//   this.updated.push(Date.now());

//   next();
// });

// TripSchema.statics = {
//   load: function(id, cb) {
//     this.findOne({
//       _id: id
//     }).populate('user').exec(cb);
//   }
// };


// TripSchema.statics.findByTitle = function (title, callback) {
//   return this.find({ title: title }, callback);
// }

// mongoose.model('Trip', TripSchema);



