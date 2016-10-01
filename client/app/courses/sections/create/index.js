'use strict';

import NewSectionCtrl from './newsection.controller';

export default angular.module('venueApp.newsection', ['venueApp.CourseFactory', 'directives.courseTitleBanner', 'directives.sectionform'
])
  .controller('NewSectionCtrl', NewSectionCtrl)
  .name;
