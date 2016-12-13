'use strict';
const ngRoute = require('angular-route');
import routing from './upload.routes';

import UploadCtrl from './upload.controller';
import submit from './submit';

export default angular.module('venueApp.uploadSubmission', ['venueApp.auth', 'venueApp.SectionEventFactory', ngRoute, submit, 'directives.eventCard'])
  .controller('UploadCtrl', UploadCtrl)
  .config(routing)
  .name;
