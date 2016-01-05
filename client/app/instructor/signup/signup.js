'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/signup', {
        templateUrl: 'app/instructor/signup/signup.html',
        controller: 'SignupCtrl'
      });
  });
