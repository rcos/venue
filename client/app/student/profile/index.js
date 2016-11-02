'use strict';
const ngRoute = require('angular-route');
import routing from './profile.routes';

import ProfileCtrl from './profile.controller';

export default angular.module('venueApp.studentProfile', [ngRoute])
  .controller('ProfileCtrl', ProfileCtrl)
  .config(routing)
  .name;
