'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/studentsubmissions', {
      template: require('./studentsubmissions.html'),
      controller: 'StudentSubmissionsCtrl',
      authenticate: 'instructor'
    });
}
