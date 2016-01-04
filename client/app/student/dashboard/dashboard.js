'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/dashboard', {
        templateUrl: 'app/student/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  });
