'use strict';
const ngRoute = require('angular-route');

import routing from './events.routes';
import edit from './edit';
import EventsCtrl from './events.controller';

export default angular.module('venueApp.events', ['venueApp.auth', 'venueApp.SectionEventFactory', ngRoute, edit])
  .config(routing)
  .controller('EventsCtrl', EventsCtrl)
  .name;
