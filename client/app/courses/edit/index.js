'use strict';

import CourseEditCtrl from './courseedit.controller';

export default angular.module('venueApp.courseedit', ['venueApp.CourseFactory', 'directives.courseTitleBanner', 'directives.courseform'])
  .controller('CourseEditCtrl', CourseEditCtrl)
  .name;
