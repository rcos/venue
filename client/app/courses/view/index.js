'use strict';

import CourseViewCtrl from './courseview.controller';

export default angular.module('venueApp.courseview', ['venueApp.auth', 'venueApp.CourseFactory','venueApp.SectionFactory', 'directives.courseTitleBanner'])
  .controller('CourseViewCtrl', CourseViewCtrl)
  .name;
