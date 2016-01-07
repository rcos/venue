'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import async from 'async';
import Event from '../event/event.model';

var CourseSchema = new Schema({
  name: String,
  courseReferenceNumber: Number,
  department: String,
  courseNumber: Number,
  description: String,
  semester: String,
  students: [{type : Schema.Types.ObjectId, ref: 'User'}],
  instructors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  events: [{type : Schema.Types.ObjectId, ref: 'Event'}],
  active: Boolean
});

/**
 * Methods
 */
CourseSchema.methods = {

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



module.exports = mongoose.model('Course', CourseSchema);
