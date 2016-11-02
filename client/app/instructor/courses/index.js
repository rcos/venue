'use strict';
const ngRoute = require('angular-route');
import routing from './instructorcourses.routes';

import InstructorCoursesCtrl from './instructorcourses.controller';

export default angular.module('venueApp.instructorcourses', ['venueApp.auth', ngRoute, 'directives.courseCard', 'directives.sidebar'])
  .controller('InstructorCoursesCtrl', InstructorCoursesCtrl)
  .config(routing)
  .name;
