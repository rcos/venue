'use strict';

angular.module('venueApp')
  .controller('NewCourseCtrl', ($scope) => {
    $scope.register = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          Course.create({
            
          }).then(() => {
            $scope.success = true;
          }).catch(() => {
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
