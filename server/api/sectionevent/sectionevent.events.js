/**
 * SectionEvent model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var SectionEvent = require('./sectionevent.model');
var SectionEventEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SectionEventEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SectionEvent.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SectionEventEvents.emit(event + ':' + doc._id, doc);
    SectionEventEvents.emit(event, doc);
  }
}

module.exports = SectionEventEvents;
