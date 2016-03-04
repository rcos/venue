'use strict';

angular.module('venueApp')
  .controller('VerifyStudentsCtrl', function ($scope, Auth, User, Section) {

    User.get({withSections:true, withSectionsCourse:true, withSectionsPendingStudents:true}, (user)=>{
      $scope.user = user;
      $scope.sections = user.sections;
    });

    $scope.verifyStudent = (section, pendingStudent) => {
      var sec = $scope.sections.indexOf(section);
      var student = $scope.sections[sec].pendingStudents.indexOf(pendingStudent);
      Section.update({id: section._id}, {pendingStudent: pendingStudent._id}, (section) => {
          $scope.sections[sec] = section;
        });
    }

  });
