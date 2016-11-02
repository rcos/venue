'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/dashboard', {
      template: require('./dashboard.html'),
      controller: 'InstructorDashboardCtrl',
      authenticate: 'instructor'
    });
}
