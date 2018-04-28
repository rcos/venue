'use strict';

export default class MainController {
  /*@ngInject*/
  constructor($scope,$window, Auth) {
    $scope.loggedIn = false;
    $scope.isStudent = false;
    $scope.isInstructor = false;
    Auth.getCurrentUser((user) => {
      $scope.user = user; 
      $scope.loggedIn = Auth.isLoggedInSync();
      if ($scope.loggedIn) {
        $scope.isStudent = Auth.isStudentSync();
        $scope.isInstructor = Auth.isInstructorSync();
        if ($scope.isStudent) {
          $window.location.href = "/student/dashboard";
        }
        if ($scope.isInstructor) {
          $window.location.href = "/instructor/dashboard";
        }
      }
    });
  }
}
