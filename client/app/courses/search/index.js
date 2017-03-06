'use strict';

import CourseSearchCtrl from './coursesearch.controller';

export default angular.module('venueApp.coursesearch', ['venueApp.auth','venueApp.CourseFactory', 'directives.courseCard', ])
  .controller('CourseSearchCtrl', CourseSearchCtrl)
  .name;
