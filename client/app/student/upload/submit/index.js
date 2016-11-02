'use strict';
const ngRoute = require('angular-route');
import routing from './submit.routes';

import SubmitCtrl from './submit.controller';
import geolocation from 'angularjs-geolocation';
import ngFileUpload from 'ng-file-upload';

export default angular.module('venueApp.submit', ['venueApp.auth', 'venueApp.SectionEventFactory', ngFileUpload, geolocation, ngRoute, 'directives.httpSrc'])
  .controller('SubmitCtrl', SubmitCtrl)
  .config(routing)
  .name;
