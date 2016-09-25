'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/submissions', {
      templateUrl: 'app/student/submissions/submission.html',
      controller: 'StudentSubmissionCtrl',
      authenticate: 'student'
    });
}
