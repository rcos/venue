/**
 * EventInfo model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var EventInfo = require('./eventinfo.model');
var EventInfoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventInfoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EventInfo.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EventInfoEvents.emit(event + ':' + doc._id, doc);
    EventInfoEvents.emit(event, doc);
  }
}

module.exports = EventInfoEvents;
