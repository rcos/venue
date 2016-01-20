'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/submissions', {
        templateUrl: 'app/student/submissions/submission.html',
        controller: 'StudentSubmissionCtrl'
      });
  });
