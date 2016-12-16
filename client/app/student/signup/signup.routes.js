'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/signup', {
      template: require('./signup.html'),
      controller: 'StudentSignupCtrl'
    });
}
