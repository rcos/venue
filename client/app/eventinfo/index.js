'use strict';
const ngRoute = require('angular-route');

import routing from './eventinfo.routes';
import edit from './edit';
import EventInfoCtrl from './eventinfo.controller';

export default angular.module('venueApp.eventinfo', ['venueApp.auth', 'venueApp.EventInfoFactory', ngRoute, edit, 'directives.httpSrc'])
  .config(routing)
  .controller('EventInfoCtrl', EventInfoCtrl)
  .name;
