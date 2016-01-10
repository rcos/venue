'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/newcourse', {
        templateUrl: 'app/instructor/newcourse/newcourse.html',
        controller: 'NewCourseCtrl'
      });
  });
