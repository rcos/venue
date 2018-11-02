'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/ta/submissions', {
      template: require('./submission.html'),
      controller: 'SubmissionCtrl',
      authenticate: 'ta'
    });
}
