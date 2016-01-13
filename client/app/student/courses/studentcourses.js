'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student/courses', {
        templateUrl: 'app/student/courses/studentcourses.html',
        controller: 'StudentCoursesCtrl'
      });
  });
