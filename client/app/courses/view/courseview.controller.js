'use strict';

angular.module('venueApp')
  .controller('CourseViewCtrl', ($scope, Course, $routeParams) => {
    Course.get({id: $routeParams.id}, course => {
      $scope.course = course;
      Course.fullSections({id: $routeParams.id}).$promise
        .then(sections => {
          $scope.sections = sections;
        });
    });
  });
