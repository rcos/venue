'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/dashboard', {
        templateUrl: 'app/instructor/dashboard/dashboard.html',
        controller: 'InstructorDashboardCtrl'
      });
  });
