'use strict';

import routes from './main.routes';
import MainController from './main.controller';

export default angular.module('venueApp.admin', ['venueApp.auth', 'ngRoute'])
  .config(routes)
  .controller('MainController', MainController)
  .name;
