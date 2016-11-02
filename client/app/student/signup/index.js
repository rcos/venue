'use strict';
const ngRoute = require('angular-route');
import routing from './signup.routes';

import StudentSignupCtrl from './signup.controller';

export default angular.module('venueApp.studentSignup', ['venueApp.auth', ngRoute])
  .controller('StudentSignupCtrl', StudentSignupCtrl)
  .config(routing)
  .name;
