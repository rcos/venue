'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/grading', {
      template: require('./grading.html'),
      controller: 'GradingCtrl',
      authenticate: 'student'
    });
}
