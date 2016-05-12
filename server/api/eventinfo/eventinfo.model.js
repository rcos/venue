'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import SectionEvent from '../sectionevent/sectionevent.model';
import Course from '../course/course.model';
var GeoJSON = require('mongoose-geojson-schema');

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
