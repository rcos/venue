

'use strict';

angular.module('venueApp')
  .controller('CourseFormCtrl', function($scope, Course, Upload){
    $scope.courseCreated = false;
    $scope.submitForm = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          var promise;
          if ($scope.updating){
            promise = Course.update($scope.course).$promise;
          }else{
            // promise = Course.create($scope.course).$promise;
            $scope.course.files = $scope.files;
            promise =  Upload.upload({
                url: '/api/courses/',
                data: $scope.course,
                objectKey: '.k',
                arrayKey: '[i]'
            });
          }
          promise
              .then((course) => {
                $scope.course._id = course._id;
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
