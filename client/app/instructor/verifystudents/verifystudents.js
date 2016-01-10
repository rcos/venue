'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/verifyStudent', {
        templateUrl: 'app/instructor/verifystudents/verifystudents.html',
        controller: 'VerifystudentsCtrl'
      });
  });
