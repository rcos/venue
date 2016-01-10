/**
 * Section model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Section = require('./section.model');
var SectionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SectionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Section.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SectionEvents.emit(event + ':' + doc._id, doc);
    SectionEvents.emit(event, doc);
  }
}

module.exports = SectionEvents;
