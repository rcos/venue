'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var EventInfoSchema = new Schema({
  title: String,
  description: String,
  imageURLs: [String],
  author: {type:Schema.Types.ObjectId, ref: 'User'},
  creationDate: Date,
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

module.exports = mongoose.model('EventInfo', EventInfoSchema);
