'use strict';
const ngRoute = require('angular-route');
import routing from './upload.routes';

import UploadCtrl from './upload.controller';

export default angular.module('venueApp.uploadSubmission', ['venueApp.auth', 'venueApp.SectionEventFactory', ngRoute])
  .controller('UploadCtrl', UploadCtrl)
  .config(routing)
  .name;
