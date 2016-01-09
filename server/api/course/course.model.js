'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import async from 'async';
import Event from '../event/event.model';

var CourseSchema = new Schema({
  name: String,
  department: String,
  courseNumber: Number,
  description: String,
  semester: String,
  active: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);
