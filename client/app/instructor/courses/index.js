'use strict';
const ngRoute = require('angular-route');

import routing from './instructorcourses.routes';
import sections from './sections';

import InstructorCoursesCtrl from './instructorcourses.controller';

export default angular.module('venueApp.instructorcourses', ['venueApp.auth', ngRoute, sections, 'directives.courseCard', 'directives.sidebar'])
  .controller('InstructorCoursesCtrl', InstructorCoursesCtrl)
  .config(routing)
  .name;
