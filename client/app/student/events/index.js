'use strict';
const ngRoute = require('angular-route');
import routing from './studentevents.routes';

import StudentEventsCtrl from './studentevents.controller';

export default angular.module('venueApp.studentEvents', ['venueApp.auth', 'venueApp.SectionEventFactory', ngRoute])
  .controller('StudentEventsCtrl', StudentEventsCtrl)
  .config(routing)
  .name;
