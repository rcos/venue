'use strict';

import CourseSearchCtrl from './coursesearch.controller';

export default angular.module('venueApp.coursesearch', ['venueApp.auth','venueApp.CourseFactory', 'directives.courseCard', 'directives.courselistview'])
  .controller('CourseSearchCtrl', CourseSearchCtrl)
  .name;
