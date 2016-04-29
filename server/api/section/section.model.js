'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import Event from '../sectionevent/sectionevent.model';
var async = require('async');

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
  //withEventSectionNumbers
    getEventsAsync(opts){
      var events = [];
      var query = Event.find({section : this._id})
      .populate('info');

      query.populate({
         path: 'section',
         populate: {
           path: 'course',
           model: 'Course'
         }
      });

      return query.lean().execAsync()
      .then((sectionEventsArray)=>{
        var events = {};
        var eventsList = [];
        sectionEventsArray.forEach((sectionEvent)=>{
          if(events[sectionEvent.info._id]){
            events[sectionEvent.info._id].sectionEvents.push(sectionEvent);
          }
          else{
            events[sectionEvent.info._id] = sectionEvent.info;
            events[sectionEvent.info._id].sectionEvents = [sectionEvent];
            eventsList.push(events[sectionEvent.info._id]);
          }
          delete sectionEvent.info;
        });
        return eventsList;
      });
    }
};

module.exports = mongoose.model('Section', SectionSchema);
