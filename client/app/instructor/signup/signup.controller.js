'use strict';

angular.module('venueApp')
  .controller('InstructorSignupCtrl', (Auth, $scope)=>{
      $scope.user = {};
      $scope.errors = {};

      $scope.register = (form)=>{
          $scope.submitted = true;
          if (form.$valid) {
            Auth.createUser({
              name: $scope.user.name,
              email: $scope.user.email,
              password: $scope.user.password,
              isInstructor: true
            })
            .then(() => {
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
