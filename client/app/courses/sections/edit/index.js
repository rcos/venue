'use strict';

import SectionEditCtrl from './sectionedit.controller';

export default angular.module('venueApp.sectionedit', ['venueApp.auth', 'venueApp.CourseFactory','venueApp.SectionFactory'])
  .controller('SectionEditCtrl', SectionEditCtrl)
  .name;
