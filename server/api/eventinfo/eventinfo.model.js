'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import SectionEvent from '../sectionevent/sectionevent.model';
import Course from '../course/course.model';
var GeoJSON = require('mongoose-geojson-schema');
var scheduler = require('../../schedule');

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
    geo: mongoose.Schema.Types.Point,
    geobounds: mongoose.Schema.Types.MultiPolygon,
  },
  times: [
    {
      start: Date,
      end: Date
    }
  ]
});
EventInfoSchema.index({ 'location.geobounds' : '2dsphere'});

EventInfoSchema.pre("save",function(next) {
  if ( !this.location.geo.coordinates || this.location.geo.coordinates === 0 ) {
    this.location.geo.coordinates = [42.7285023,-73.6839912];
  }
  if ( !this.location.geobounds.coordinates || this.location.geobounds.coordinates === 0 ) {
    this.location.geobounds.coordinates =  [[
                [
                     -73.6794438867554,
                    42.731655780717645
                ],[
                    -73.68399291324465,
                    42.731655780717645
                ],[
                  -73.68399291324465,
                    42.73007960926878
                ],[
                     -73.6794438867554,
                    42.73007960926878
                ],[
                     -73.6794438867554,
                    42.731655780717645
                ]
              ]];

  }

  next();
});

EventInfoSchema
  .set('toJSON', {
      virtuals: true
  });

EventInfoSchema
  .set('toObject', {
      virtuals: true
  });

// VIRTUALS
EventInfoSchema
    .virtual("isHappeningNow")
    .get(function(){
        var now = new Date();
        return this.times.some((time) => time.start.getTime() < now.getTime() && time.end.getTime() > now.getTime());
    });

EventInfoSchema
    .virtual("isPastDate")
    .get(function(){
        var now = new Date();
        return this.times.length > 0 && this.times[this.times.length-1].end.getTime() < now.getTime();
    });

EventInfoSchema
    .virtual("attendees")
    .get(function(){
        // TODO iterate through submissions and generate list of attendees
        return [];
    });

/**
 * Pre-save hook
 */
EventInfoSchema
  .pre('save', function(next) {
    // Handle new/update times
    SectionEvent.findAsync({info: this._id}).then(sectionEvents => {
        sectionEvents.forEach(se => {
            se.updateUserNotifications();
        });
    });
    return next();
  });

/**
 * Methods
 */
EventInfoSchema.methods = {

    /**
     * Returns all related users.
     */
     getRelatedUsers(){
         return SectionEvent.findAsync({info:this._id})
         .then(sectionEvents =>{
             return sectionEvents.map(se => se.getRelatedUsers())
         });
     },

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
