'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/:id/profile', {
        templateUrl: 'app/student/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });
