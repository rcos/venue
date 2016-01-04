'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  description: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  creationDate: Date,
  courses: []{type: Schema.Types.ObjectId, ref: 'Course'}],
  submissions: [{type : Schema.Types.ObjectId, ref: 'Submission '}],
  locations: [String], // TODO, what format should this be in?
  times: [{
      start: Date,
      end: Date
  }]
});

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
