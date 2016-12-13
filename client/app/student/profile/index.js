'use strict';
const ngRoute = require('angular-route');
import routing from './profile.routes';

import StudentProfileCtrl from './profile.controller';

export default angular.module('venueApp.studentProfile', [ngRoute])
  .controller('StudentProfileCtrl', StudentProfileCtrl)
  .config(routing)
  .name;
