'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/ta/events', {
      template: require('./studentevents.html'),
      controller: 'StudentEventsCtrl',
      authenticate: 'ta'
    });
}
