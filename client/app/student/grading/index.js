'use strict';
const ngRoute = require('angular-route');
import routing from './grading.routes';

import GradingCtrl from './grading.controller';

export default angular.module('venueApp.grading', ['venueApp.auth', 'venueApp.SubmissionFactory', ngRoute, 'directives.submissionCard'])
  .controller('GradingCtrl', GradingCtrl)
  .config(routing)
  .name;
