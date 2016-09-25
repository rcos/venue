'use strict';

import CourseEditCtrl from './courseedit.controller';

export default angular.module('venueApp.courseedit', ['venueApp.CourseFactory'])
  .controller('CourseEditCtrl', CourseEditCtrl)
  .name;
