'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/newevent', {
      template: require('./newevent.html'),
      controller: 'NewEventCtrl',
      authenticate: 'instructor'
    });
}
