'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/events', {
        templateUrl: 'app/instructor/events/events.html',
        controller: 'InstructorEventsCtrl',
        authenticate: 'instructor'
      });
  });
