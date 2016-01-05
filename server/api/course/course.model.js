'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: String,
  courseReferenceNumber: Number,
  department: String,
  courseNumber: Number,
  description: String,
  semester: String,
  students: [{type : Schema.Types.ObjectId, ref: 'User'}],
  instructors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  active: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);
