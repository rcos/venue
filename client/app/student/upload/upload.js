'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/upload', {
        templateUrl: 'app/student/upload/eventlist.html',
        controller: 'UploadCtrl',
        authenticate: 'student'
      })
      .when('/student/upload/:eventid', {
        templateUrl: 'app/student/upload/upload.html',
        controller: 'UploadCtrl',
        authenticate: 'student'
      });
  });
