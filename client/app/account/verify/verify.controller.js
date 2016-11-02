'use strict';

export default class VerifyAccountCtrl {

  /*@ngInject*/
  constructor($scope, $routeParams, User, $location) {
    User.verify({controller: $routeParams.id}, (res)=>{
      $scope.isVerified = res.isVerified;
    });
    $scope.goToLogin = function(){
      $location.path("/login");
    };
    $scope.resendEmail = function(){
      $location.path("/verify/resendEmail");
    };
  }
}
