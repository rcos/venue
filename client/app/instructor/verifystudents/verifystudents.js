'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/verifystudent', {
        templateUrl: 'app/instructor/verifystudents/verifystudents.html',
        controller: 'VerifyStudentsCtrl'
      });
  });
