'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/ta/dashboard', {
      template: require('./dashboard.html'),
      controller: 'StudentDashboardCtrl',
      authenticate: 'ta'
    });
}
