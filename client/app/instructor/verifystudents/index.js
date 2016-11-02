'use strict';
const ngRoute = require('angular-route');
import routing from './verifystudents.routes';

import VerifyStudentsCtrl from './verifystudents.controller';

export default angular.module('venueApp.verifyStudents', ['venueApp.auth', 'venueApp.SectionFactory', ngRoute, 'directives.sidebar'])
  .controller('VerifyStudentsCtrl', VerifyStudentsCtrl)
  .config(routing)
  .name;
