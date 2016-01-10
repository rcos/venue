'use strict';

angular.module('venueApp')
  .controller('VerifystudentsCtrl', function ($scope, Auth, User, Section) {
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      User.getFullSections({id:$scope.user._id})
      .$promise.then((user) => {
        $scope.sections = user.sections;
      });
    });

    $scope.verifyStudent = (section, pendingStudent) => {
      var sec = $scope.sections.indexOf(section);
      var student = $scope.sections[sec].pendingStudents.indexOf(pendingStudent);
      $scope.sections[sec].pendingStudents.splice(student, 1);
    Section.update({id: section._id}, {pendingStudent: pendingStudent._id})
        .$promise.then((res) => {
          console.log(res);
        });
    }

  });
