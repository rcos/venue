'use strict';
const ngRoute = require('angular-route');
import routing from './signup.routes';

import InstructorSignupCtrl from './signup.controller';

export default angular.module('venueApp.instructorSignup', ['venueApp.auth',ngRoute])
  .controller('InstructorSignupCtrl', InstructorSignupCtrl)
  .config(routing)
  .name;
