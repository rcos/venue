'use strict';

angular.module('venueApp')
  .controller('StudentSubmissionsCtrl', function ($scope, User, Auth, Submission) {
    Submission.getAll({'onlyInstructor': 'me', 'withStudents': true}, (submissions)=>{
      $scope.submissions = submissions;
    });
  });
