'use strict';

angular.module('venueApp')
  .controller('CourseEditCtrl', function ($scope, Course, $routeParams) {
    Course.get({id: $routeParams.id}, (course) => {
      $scope.course = course;
    });
  });
