'use strict';

import SectionViewCtrl from './sectionview.controller';

export default angular.module('venueApp.sectionview', ['venueApp.auth', 'venueApp.CourseFactory','venueApp.SectionFactory','venueApp.SubmissionFactory', 'directives.courseTitleBanner', 'directives.eventCard'])
  .controller('SectionViewCtrl', SectionViewCtrl)
  .name;
