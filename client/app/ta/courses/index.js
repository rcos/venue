'use strict';
const ngRoute = require('angular-route');
import routing from './studentcourses.routes';

import StudentCoursesCtrl from './studentcourses.controller';

export default angular.module('venueApp.studentcourses', ['venueApp.auth', ngRoute,  'directives.courseCard'])
  .controller('StudentCoursesCtrl', StudentCoursesCtrl)
  .config(routing)
  .name;
