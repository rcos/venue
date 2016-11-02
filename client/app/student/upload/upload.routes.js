'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/upload', {
      template: require('./upload.html'),
      controller: 'UploadCtrl',
      authenticate: 'student'
    })
    .when('/student/upload/:eventid', {
      template: require('./submit/submit.html'),
      controller: 'SubmitCtrl',
      authenticate: 'student'
    });
}
