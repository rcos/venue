'use strict';
const ngRoute = require('angular-route');
import routing from './events.routes';

import InstructorEventsCtrl from './events.controller';

export default angular.module('venueApp.instructorEvents', ['venueApp.auth','venueApp.SectionEventFactory',ngRoute])
  .controller('InstructorEventsCtrl', InstructorEventsCtrl)
  .config(routing)
  .name;
