/**
 * Course model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Course = require('./course.model');
var CourseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CourseEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Course.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CourseEvents.emit(event + ':' + doc._id, doc);
    CourseEvents.emit(event, doc);
  }
}

module.exports = CourseEvents;
