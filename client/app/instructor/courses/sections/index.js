'use strict';
const ngRoute = require('angular-route');
import routing from './sectionview.routes';

import InstructorSectionViewCtrl from './sectionview.controller';

export default angular.module('venueApp.instructorcourses', ['venueApp.auth', 'venueApp.SubmissionFactory', 'venueApp.SectionFactory', ngRoute])
  .controller('InstructorSectionViewCtrl', InstructorSectionViewCtrl)
  .config(routing)
  .name;
