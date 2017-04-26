'use strict';

import CourseViewCtrl from './courseview.controller';
import ngSweetAlert from 'angular-sweetalert';

export default angular.module('venueApp.courseview', ['venueApp.auth', 'venueApp.CourseFactory','venueApp.SectionFactory', 'directives.courseTitleBanner'])
  .controller('CourseViewCtrl', CourseViewCtrl)
  .name;
