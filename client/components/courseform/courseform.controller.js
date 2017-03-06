'use strict';
export function CourseFormCtrl ($scope, Course, Upload){
    "ngInject";
    $scope.courseCreated = false;
    $scope.submitForm = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          var promise;
          if ($scope.updating){
            var course = JSON.parse(JSON.stringify($scope.course));
            course.files = [$scope.file];
            promise =  Upload.upload({
                url: '/api/courses/'+$scope.course._id,
                data: course,
                method: 'PUT',
                objectKey: '.k',
                arrayKey: '[i]'
            }).then((course) => {
              return course.data
            });
          }else{
            // promise = Course.create($scope.course).$promise;
            $scope.course.files = [$scope.file];
            promise =  Upload.upload({
                url: '/api/courses/',
                data: $scope.course,
                objectKey: '.k',
                arrayKey: '[i]'
            }).then((course) => {
              return course.data
            });
          }
          promise
              .then((course) => {
                $scope.course = course;
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
  };
