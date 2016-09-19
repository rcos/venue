'use strict';

import LoginController from './login.controller';

export default angular.module('venueApp.login', [])
  .controller('LoginController', LoginController)
  .name;
