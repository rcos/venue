'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses', {
        templateUrl: 'app/courses/search/coursesearch.html',
        controller: 'CourseSearchCtrl'
      })
      .when('/courses/:id', {
        templateUrl: 'app/courses/view/courseview.html',
        controller: 'CourseViewCtrl'
      });
  });
