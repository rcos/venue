'use strict';
const ngRoute = require('angular-route');
import routing from './submission.routes';

import SubmissionCtrl from './submission.controller';

export default angular.module('venueApp.submissions', ['venueApp.auth', 'venueApp.SubmissionEventFactory', ngRoute])
  .controller('SubmissionCtrl', SubmissionCtrl)
  .config(routing)
  .name;
