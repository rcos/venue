'use strict';

angular.module('venueApp')
  .controller('ResetPasswordCtrl', function ($scope, $routeParams, User, $location) {

    $scope.user = {};
    $scope.errors = {};
    $scope.success = false;

    $scope.goToResetPassword = ()=>{
      this.$location.path("/verify/forgotPassword");
    }

    $scope.resetEmail = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          User.changePassword({'token':$routeParams.id, 'newPassword':$scope.password})
            .$promise
            .then(res => {
              $scope.success = res.success;
            })
            .catch(err => {
              $scope.success = false;
            });
        }
    };

  });
