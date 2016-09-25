'use strict';
const ngRoute = require('angular-route');
import routing from './dashboard.routes';

import InstructorDashboardCtrl from './dashboard.controller';

export default angular.module('venueApp.instructordashboard', ['venueApp.auth','venueApp.util',ngRoute])
  .controller('InstructorDashboardCtrl', InstructorDashboardCtrl)
  .config(routing)
  .name;
