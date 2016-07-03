'use strict';

angular.module('venueApp')
  .controller('ResendEmailCtrl', function ($scope, $routeParams, User, $location) {
    $scope.goToLogin = function(){
      $location.path("/login");
    };

    $scope.user = {};
    $scope.errors = {};

    $scope.sendEmail = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          User.resendEmail({
              email: $scope.email
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
