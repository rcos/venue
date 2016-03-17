'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/courses', {
        templateUrl: 'app/instructor/courses/instructorcourses.html',
        controller: 'InstructorCoursesCtrl',
        authenticate: 'instructor'
      });
  });
