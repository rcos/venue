'use strict';

export default class MainController {
  /*@ngInject*/
  constructor($scope, Auth) {
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.loggedIn = Auth.isLoggedIn();
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
      $scope.isInstructor = user.isInstructor;
    });
  }
}
