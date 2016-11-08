'use strict';
const ngRoute = require('angular-route');

import routing from './events.routes';
import EventsCtrl from './events.controller';

export default angular.module('venueApp.events', ['venueApp.auth', 'venueApp.SectionEventFactory', ngRoute, 'directives.httpSrc', 'directives.submissionview', 'directives.eventTitleBanner'])
  .config(routing)
  .controller('EventsCtrl', EventsCtrl)
  .name;
