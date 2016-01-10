'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
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
  getFullSections(cb){
    var asyncTasks = [];
    var fullSections = [];
    this.sections.forEach(function(sectionId){
      asyncTasks.push(function(callback){
        Section.findById(sectionId.toString())
        .then(section => {
          fullSections.push(section);
          callback();
        });
      });
    });
    async.parallel(asyncTasks, () => {
      cb(fullSections)
    });
  }
};

module.exports = mongoose.model('Course', CourseSchema);
