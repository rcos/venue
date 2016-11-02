'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/:id/profile', {
      template: require('./profile.html'),
      controller: 'ProfileCtrl',
      authenticate: 'student'
    });
}
