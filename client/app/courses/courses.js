'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses', {
        templateUrl: 'app/courses/courses.html',
        controller: 'CoursesCtrl'
      });
  });
