'use strict';

angular.module('venueApp')
  .controller('VerifyAccountCtrl', function ($scope, $routeParams, User, $location) {
    User.verify({controller: $routeParams.id}, (res)=>{
      $scope.isVerified = res.isVerified;
    });
    $scope.goToLogin = function(){
      $location.path("/login");
    };
    $scope.resendEmail = function(){
      $location.path("/verify/resendEmail");
    };
  });
