'use strict';

import LoginController from './login.controller';

export default angular.module('fullstackAngularApp.login', [])
  .controller('LoginController', LoginController)
  .name;
