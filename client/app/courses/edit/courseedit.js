'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses/:id/edit', {
        templateUrl: 'app/courses/edit/courseedit.html',
        controller: 'CourseEditCtrl'
      });
  });
