'use strict';
const ngRoute = require('angular-route');

import routing from './admin.routes';
import AdminController from './admin.controller';
import ngFileUpload from 'ng-file-upload';

export default angular.module('venueApp.admin', ['venueApp.auth', ngRoute, 'venueApp.SettingsFactory', 'directives.sortArrow', ngFileUpload])
  .config(routing)
  .controller('AdminController', AdminController)
  .name;
