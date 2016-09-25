'use strict';
const ngRoute = require('angular-route');
import routing from './submit.routes';

import SubmitCtrl from './submit.controller';

export default angular.module('venueApp.submit', ['venueApp.auth', 'venueApp.SectionEventFactory', Upload, geolocation, ngRoute])
  .controller('SubmitCtrl', SubmitCtrl)
  .config(routing)
  .name;
