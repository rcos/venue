'use strict';

import SectionEditCtrl from './sectionedit.controller';

export default angular.module('venueApp.sectionedit', ['venueApp.auth', 'venueApp.CourseFactory','venueApp.SectionFactory', 'directives.courseTitleBanner', 'directives.sectionform'])
  .controller('SectionEditCtrl', SectionEditCtrl)
  .name;
