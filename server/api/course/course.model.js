'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

import Section from '../section/section.model';
import async from 'async';
import User from '../user/user.model';

var CourseSchema = new Schema({
  name: String,
  department: String,
  courseNumber: Number,
  creator: {type:Schema.Types.ObjectId, ref: 'User'},
  description: String,
  semester: String,
  active: Boolean,
  imageURLs: [String],
  deleted: Boolean
});

/**
 * Methods
 */
CourseSchema.methods = {

  checkCreator(userId){
    if(userId == this.creator._id){
      return true;
    }
    return false;
  },

  getRelatedUsers(){
    return Section.findAsync({course:this._id})
      .then(sections =>{
        return sections.map(section => section.getRelatedUsers())
      })
  },

  /**
   * Returns sections for a course
   * @param opts: [optional] Additional flags e.g. {withInstructors:true}
   * @param cb: Function callback
   **/
  getSections(opts, cb){
    if (!cb) cb = function(){};
    var withInstructors = opts.withInstructors;
    var withEnrollmentStatus = opts.withEnrollmentStatus;
    var studentId = opts.studentId; // for withEnrollmentStatus

    var query = Section.find({course: this._id});
    if (withInstructors) query.populate("instructors");
    query.then((sections)=>{
      // If requested, mark all sections student is enrolled in
      if (withEnrollmentStatus){
        sections = sections.map((section)=>{
          section = section.toObject();
          section.isEnrolled = section.students.some((sectionStudent) => {
            return String(sectionStudent) === studentId || String(sectionStudent._id) === studentId ;

          });
          section.isPending = section.pendingStudents.some((sectionStudent) => {
            return String(sectionStudent) === studentId || String(sectionStudent._id) === studentId ;

          });

          return section;
        });
      }
      cb(sections);
    });
  }
};

module.exports = mongoose.model('Course', CourseSchema);
