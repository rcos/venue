'use strict';

angular.module('venueApp')
  .controller('CourseViewCtrl', ($scope, Course, $routeParams) => {
    Course.get({id: $routeParams.id}, course => {
      $scope.course = course;
      Course.fullEvents({id: $routeParams.id}).$promise
        .then(events => {
          console.log(events);
        });
    });
  });
