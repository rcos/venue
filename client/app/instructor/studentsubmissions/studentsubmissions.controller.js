'use strict';

angular.module('venueApp')
  .controller('StudentSubmissionsCtrl', function ($scope, User, Auth, Submission) {
    Submission.getAll({'onlyInstructor': 'me', 'withStudents': true}, (subs)=>{
      $scope.submissions = subs;
    });
  });
