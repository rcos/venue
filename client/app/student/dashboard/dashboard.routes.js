'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/dashboard', {
      template: require('./dashboard.html'),
      controller: 'StudentDashboardCtrl',
      authenticate: 'student'
    });
}
