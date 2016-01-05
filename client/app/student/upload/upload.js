'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/:id/upload', {
        templateUrl: 'app/student/upload/upload.html',
        controller: 'UploadCtrl'
      });
  });
