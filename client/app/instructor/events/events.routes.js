'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/instructor/events', {
      templateUrl: 'app/instructor/events/events.html',
      controller: 'InstructorEventsCtrl',
      authenticate: 'instructor'
    });
}
