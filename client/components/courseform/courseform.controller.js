

'use strict';

angular.module('venueApp')
  .controller('CourseFormCtrl', function($scope, Course){
    $scope.courseCreated = false;
    $scope.submitForm = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          var promise;
          if ($scope.updating){
            promise = Course.update($scope.course).$promise;
          }else{
            promise = Course.create($scope.course).$promise;
          }
          promise
              .then((course) => {
                $scope.success = true;
              })
              .catch(err => {
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
