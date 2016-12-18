'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/:id/profile', {
      template: require('./profile.html'),
      controller: 'InstructorProfileCtrl'
    });
}
