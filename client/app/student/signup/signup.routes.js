'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/signup', {
      templateUrl: 'app/student/signup/signup.html',
      controller: 'StudentSignupCtrl'
    });
}
