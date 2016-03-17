'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/events', {
        templateUrl: 'app/student/events/studentevents.html',
        controller: 'StudentEventsCtrl',
        authenticate: 'student'
      });
  });
