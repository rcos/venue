'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/verifystudent', {
      template: require('./verifystudents.html'),
      controller: 'VerifyStudentsCtrl',
      authenticate: 'instructor'
    });
}
