'use strict';
const ngRoute = require('angular-route');

import SignupController from './signup.controller';

export default angular.module('venueApp.signup', ['venueApp.auth', ngRoute])
  .controller('SignupController', SignupController)
  .name;
