'use strict';

angular.module('venueApp')
  .controller('ResendEmailCtrl', function ($scope, $routeParams, User, $location) {
    $scope.goToLogin = function(){
      $location.path("/login");
    };

    $scope.user = {};
    $scope.errors = {};
    $scope.success = false;

    $scope.sendEmail = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          User.resendEmail({
              email: $scope.email
          }).$promise
          .then(res => {
              $scope.success = res.success;
          })
          .catch(err => {
            // Update validity of form fields that match the mongoose errors
            form['email'].$setValidity('mongoose', false);
            $scope.errors['email'] = err.data.message;
          });
        }
    };

  });
