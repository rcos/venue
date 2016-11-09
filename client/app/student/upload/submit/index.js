'use strict';

import SubmitCtrl from './submit.controller';
import geolocation from 'angularjs-geolocation';
import ngFileUpload from 'ng-file-upload';

export default angular.module('venueApp.submit', ['venueApp.auth', 'venueApp.SectionEventFactory',
 ngFileUpload, 'geolocation', 'directives.httpSrc'])
  .controller('SubmitCtrl', SubmitCtrl)
  .name;
