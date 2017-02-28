'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/instructor/events', {
      template: require('./events.html'),
      controller: 'InstructorEventsCtrl',
      authenticate: 'instructor'
    });
}
