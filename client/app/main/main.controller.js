'use strict';

export default class MainController {
  /*@ngInject*/
  constructor($scope, Auth) {
    $scope.loggedIn = false;
    $scope.isStudent = false;
    $scope.isInstructor = false;
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.loggedIn = Auth.isLoggedInSync();
      if ($scope.loggedIn){
        $scope.isStudent = Auth.isStudentSync();
        $scope.isInstructor = Auth.isInstructorSync();
      }
    });
  }
}
