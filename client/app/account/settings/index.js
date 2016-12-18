'use strict';

import SettingsController from './settings.controller';

export default angular.module('venueApp.settings', ['venueApp.auth'])
  .controller('SettingsController', SettingsController)
  .name;
