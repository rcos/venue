'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import SectionEvent from '../sectionevent/sectionevent.model';
import Course from '../course/course.model';

var EventInfoSchema = new Schema({
  title: String,
  description: String,
  imageURLs: [String],
  author: {type:Schema.Types.ObjectId, ref: 'User'},
  creationDate: Date,
  location: {
    address: String,
    description: String,
    radius: {
      type: Number,
      default: 0.001
    },
    geo: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [Number]
    }
  },
  times: [
    {
      start: Date,
      end: Date
    }
  ]
});
EventInfoSchema.index({ 'location.geo' : '2dsphere'});

// VIRTUALS
EventInfoSchema
    .virtual("isHappeningNow")
    .get(function(){
        var now = new Date();
        // TODO iterate through times, check if event is happening
        return true;
    });

EventInfoSchema
    .virtual("attendees")
    .get(function(){
        // TODO iterate through submissions and generate list of attendees
        return [];
    });

/**
 * Methods
 */
EventInfoSchema.methods = {

    /**
     * Returns section events for an event
     * @param opts: [optional] Additional flags
     * @param cb: Function callback
     **/
    getSectionEventsAsync(opts, cb){
      if (!cb) cb,opts = opts, {};
      var withCourses = opts.withCourses;

      var query = SectionEvent.find({info: this._id});
      query.populate("section");
      if (withCourses){
        query.populate({
          path: 'section',
          populate: {
             path: 'course',
             model: 'Course'
           }
        })
      }
      query.then((sectionEvents)=>{
        cb(sectionEvents);
      });
    }
};

module.exports = mongoose.model('EventInfo', EventInfoSchema);
