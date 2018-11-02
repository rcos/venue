'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/ta/grading', {
      template: require('./grading.html'),
      controller: 'GradingCtrl',
      authenticate: 'ta'
    });
}
