'use strict';
const ngRoute = require('angular-route');
import routing from './studentsubmissions.routes';

import StudentSubmissionsCtrl from './studentsubmissions.controller';

export default angular.module('venueApp.studentSubmissions', ['venueApp.auth', 'venueApp.SubmissionFactory', ngRoute, 'directives.submissionCard'])
  .controller('StudentSubmissionsCtrl', StudentSubmissionsCtrl)
  .config(routing)
  .name;
