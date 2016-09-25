'use strict';
const ngRoute = require('angular-route');
import routing from './newcourse.routes';

import NewCourseCtrl from './newcourse.controller';

export default angular.module('venueApp.newcourse', [ngRoute])
  .controller('NewCourseCtrl', NewCourseCtrl)
  .config(routing)
  .name;
