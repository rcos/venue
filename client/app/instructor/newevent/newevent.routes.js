'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/newevent', {
      template: require('./newevent.html'),
      controller: 'NewEventCtrl',
      authenticate: 'instructor'
    })
    .when('/instructor/neweventassignment', {
      template: require('./neweventassignment.html'),
      controller: 'NewEventAsgmtCtrl',
      authenticate: 'instructor'
    });
}
