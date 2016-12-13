'use strict';
const ngRoute = require('angular-route');

import routing from './sectionview.routes';
import InstructorSectionViewCtrl from './sectionview.controller';

export default angular.module('venueApp.instructorSections', ['venueApp.auth', 'venueApp.SubmissionFactory', 'venueApp.SectionFactory', ngRoute, 'directives.courseTitleBanner'])
  .controller('InstructorSectionViewCtrl', InstructorSectionViewCtrl)
  .config(routing)
  .name;
