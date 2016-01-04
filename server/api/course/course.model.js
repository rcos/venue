'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: String,
  description: String,
  students: [{type : Schema.Types.ObjectId, ref: 'User'}],
  active: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);
