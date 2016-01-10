'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SectionSchema = new Schema({
  course: {type : Schema.Types.ObjectId, ref: 'Course'},
  instructors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  students: [{type : Schema.Types.ObjectId, ref: 'User'}],
  pendingStudents: [{type : Schema.Types.ObjectId, ref: 'User'}],
  sectionNumbers: [Number],
  enrollmentPolicy: {type: String, enum: ['open', 'closed', 'approvalRequired']},
});

/**
 * Methods
 */
SectionSchema.methods = {
  getFullEvents(cb){
    var asyncTasks = [];
    var events = [];
    this.events.forEach(function(eventId){
      asyncTasks.push(function(callback){
        Event.findById(eventId.toString())
        .then(evnt => {
          events.push(evnt);
          callback();
        });
      });
    });
    async.parallel(asyncTasks, () => {
      cb(events)
    });
  }
};

module.exports = mongoose.model('Section', SectionSchema);
