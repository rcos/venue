'use strict';
const ngRoute = require('angular-route');
import routing from './profile.routes';

import InstructorProfileCtrl from './profile.controller';

export default angular.module('venueApp.instructorProfile', [ngRoute])
  .controller('InstructorProfileCtrl', InstructorProfileCtrl)
  .config(routing)
  .name;
