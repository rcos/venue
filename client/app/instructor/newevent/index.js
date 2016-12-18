'use strict';
const ngRoute = require('angular-route');
import routing from './newevent.routes';

import NewEventCtrl from './newevent.controller';

export default angular.module('venueApp.newevent', [ngRoute, 'directives.eventform'])
  .controller('NewEventCtrl', NewEventCtrl)
  .config(routing)
  .name;
