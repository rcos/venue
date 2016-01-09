'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  description: String,
  imageURL: String, // url to image
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  creationDate: Date,
  course: {type: Schema.Types.ObjectId, ref: 'Course'},
  submissions: [{type : Schema.Types.ObjectId, ref: 'Submission '}],
  location: {
    address: String,
    description: String,
    geo: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [Number]
    }
  },
  times: [{
      start: Date,
      end: Date
  }]
});
EventSchema.index({ 'location.geo' : '2dsphere'});

// VIRTUALS
EventSchema
    .virtual("isHappeningNow")
    .get(function(){
        var now = new Date();
        // TODO iterate through times, check if event is happening
        return true;
    });

EventSchema
    .virtual("attendees")
    .get(function(){
        // TODO iterate through submissions and generate list of attendees
        return [];
    });

module.exports = mongoose.model('Event', EventSchema);
