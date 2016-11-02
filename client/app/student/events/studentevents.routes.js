'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/events', {
      template: require('./studentevents.html'),
      controller: 'StudentEventsCtrl',
      authenticate: 'student'
    });
}
