'use strict';

import EditEventsCtrl from './eventedit.controller';

export default angular.module('venueApp.eventedit', ['venueApp.auth', 'venueApp.SectionEventFactory', 'directives.eventform'])
  .controller('EditEventsCtrl', EditEventsCtrl)
  .name;
