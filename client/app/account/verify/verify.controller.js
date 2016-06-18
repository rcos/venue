'use strict';

angular.module('venueApp')
  .controller('VerifyAccountCtrl', function ($scope, $routeParams, User, $location) {
    User.verify({controller: $routeParams.id}, (res)=>{
      $scope.verified = res.verified;
    });
    $scope.goToLogin = function(){
      $location.path("/login");
    };
  });
