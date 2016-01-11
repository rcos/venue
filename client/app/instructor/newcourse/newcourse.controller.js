'use strict';

angular.module('venueApp')
  .controller('NewCourseCtrl', ($scope, Course) => {
    $scope.courseCreated = false;
    $scope.createCourse = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          $scope.success = true;

          Course
            .create($scope.course).$promise
              .then((course) => {
                $scope.success = true;
              })
              .catch(() => {
                err = err.data;
                $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, (error, field) => {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
                });
              });
        }
    };
  });
