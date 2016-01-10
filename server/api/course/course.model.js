'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

import Section from '../section/section.model';
import async from 'async';

var CourseSchema = new Schema({
  name: String,
  department: String,
  courseNumber: Number,
  description: String,
  semester: String,
  active: Boolean
});

/**
 * Methods
 */
CourseSchema.methods = {

  /**
   * Returns sections for a course
   * @param opts: [optional] Additional flags e.g. {withInstructors:true}
   * @param cb: Function callback
   **/
  getSections(opts, cb){
    if (!cb) cb,opts = opts, {};
    var withInstructors = opts.withInstructors;

    var query = Section.find({course: this._id});
    if (withInstructors) query.populate("instructors");
    query.then(cb);
  }
};

module.exports = mongoose.model('Course', CourseSchema);
