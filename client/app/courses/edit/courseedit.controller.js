'use strict';

angular.module('venueApp')
  .controller('CourseEditCtrl', function ($scope, Course, $http, $routeParams) {
    Course.get({id: $routeParams.id}, (course) => {
      $scope.course = course;
      $scope.coursesLoaded  = true;
    });
  });
