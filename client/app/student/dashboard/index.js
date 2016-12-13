'use strict';
const ngRoute = require('angular-route');
import routing from './dashboard.routes';

import StudentDashboardCtrl from './dashboard.controller';

export default angular.module('venueApp.studentDashboard', [ngRoute, 'venueApp.auth', 'directives.eventCard'])
  .controller('StudentDashboardCtrl', StudentDashboardCtrl)
  .config(routing)
  .name;
