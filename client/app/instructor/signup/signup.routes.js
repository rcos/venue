'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/signup', {
      template: require('./signup.html'),
      controller: 'InstructorSignupCtrl'
    });
}
