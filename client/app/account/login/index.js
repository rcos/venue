'use strict';

import LoginController from './login.controller';

export default angular.module('venueApp.login', ['venueApp.auth','venueApp.SettingsFactory'])
  .controller('LoginController', LoginController)
  .name;
