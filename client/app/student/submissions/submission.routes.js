'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/submissions', {
      template: require('./submission.html'),
      controller: 'SubmissionCtrl',
      authenticate: 'student'
    });
}
