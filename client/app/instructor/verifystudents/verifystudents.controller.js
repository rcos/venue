'use strict';

angular.module('venueApp')
  .controller('VerifystudentsCtrl', function ($scope, Auth, User, Section) {
    $scope.message = 'Hello';

    $scope.verifyStudents = [{firstName:"seve", lastName:"ibarlz"}, {firstName:"seve", lastName:"ibarlz"}, {firstName:"seve", lastName:"ibarlz"}];

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      User.getFullSections({id:$scope.user._id})
      .$promise.then((user) => {
        console.log(user);
        $scope.sections = user.sections;
      });
    });

    $scope.verifyStudent = (section, pendingStudent) => {
      console.log(section);
      var sec = $scope.sections.indexOf(section);
      console.log(sec);
      var student = $scope.sections[sec].pendingStudents.indexOf(pendingStudent);
      $scope.sections[sec].pendingStudents.splice(student, 1);
      // TODO: Send backend request
    }

  });
