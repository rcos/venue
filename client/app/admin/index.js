'use strict';

import routes from './admin.routes';
import AdminController from './admin.controller';
import ngFileUpload from 'ng-file-upload';

export default angular.module('venueApp.admin', ['venueApp.auth', 'ngRoute', 'venueApp.SettingsFactory', 'directives.sortArrow', ngFileUpload])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
