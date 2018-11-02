'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/ta/upload', {
      template: require('./upload.html'),
      controller: 'UploadCtrl',
      authenticate: 'ta'
    })
    .when('/ta/upload/:eventid', {
      template: require('./submit/submit.html'),
      controller: 'SubmitCtrl',
      authenticate: 'ta'
    });
}
