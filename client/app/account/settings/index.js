'use strict';

const ngRoute = require('angular-route');
import routing from './settings.routes';
import SettingsController from './settings.controller';
export default angular.module('venueApp.settings', ['venueApp.auth'])
  .controller('SettingsController', SettingsController)
  .config(routing)
  .name;
