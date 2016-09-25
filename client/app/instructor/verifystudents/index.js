'use strict';
const ngRoute = require('angular-route');
import routing from './verifystudents.routes';

import VerifyStudentsCtrl from './verifystudents.controller';

export default angular.module('venueApp.verifyStudents', ['venueApp.auth', 'venueApp.SectionFactory', ngRoute])
  .controller('VerifyStudentsCtrl', VerifyStudentsCtrl)
  .config(routing)
  .name;
