'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/signup', {
        templateUrl: 'app/student/signup/signup.html',
        controller: 'SignupCtrl'
      });
  });
