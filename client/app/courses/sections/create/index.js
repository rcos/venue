'use strict';

import NewSectionCtrl from './newsection.controller';

export default angular.module('venueApp.newsection', ['venueApp.CourseFactory'])
  .controller('NewSectionCtrl', NewSectionCtrl)
  .name;
