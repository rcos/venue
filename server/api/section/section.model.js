'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import Event from '../sectionevent/sectionevent.model';
var async = require('async');
var scheduler = require('../../schedule');

var SectionSchema = new Schema({
  course: {type : Schema.Types.ObjectId, ref: 'Course'},
  instructors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  students: [{type : Schema.Types.ObjectId, ref: 'User'}],
  pendingStudents: [{type : Schema.Types.ObjectId, ref: 'User'}],
  sectionNumbers: [Number],
  enrollmentPolicy: {type: String, enum: ['open', 'closed', 'approvalRequired']},
});

/**
 * Pre-save hook
 */
SectionSchema
  .pre('save', function(next) {
    // Handle new/update times
    Promise.all([
        this.getRelatedUsers(),
        this.getSectionEventsAsync()
    ]).then(([users, events]) => {
        Promise.all(users.map(user => {
            return user.updateNotifications(events);
        })).then(()=>{
          next();
        });
    });
  });

/**
 * Methods
 */
SectionSchema.methods = {

  getRelatedUsers(){
      return this.populate({path:'students', select: "email preferences firstName lastName"}).execPopulate().then(fullSection => fullSection.students);
  },

  getSectionEventsAsync(opts){
    return Event.find({section: this._id}).execAsync().then((secs) => {
      return Promise.all(secs.map(sec => sec.getFullEvent()));
    });
  },

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

export default mongoose.model('Section', SectionSchema);
