'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/studentsubmissions', {
        templateUrl: 'app/instructor/studentsubmissions/studentsubmissions.html',
        controller: 'StudentSubmissionsCtrl',
        authenticate: 'instructor'
      });
  });
