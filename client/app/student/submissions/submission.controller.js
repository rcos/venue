'use strict';

angular.module('venueApp')
  .controller('StudentSubmissionCtrl', ($scope, $routeParams, User, Auth, Submission) => {

    $scope.user = {};
    $scope.courses = [];
    $scope.events = [];


    User.get({withSections:true, withEvents: true, withSectionsCourse:true}, (user) => {
      $scope.user = user;
      Submission.getAll({onlyStudent:user._id}, (submissions) => {
        $scope.submissions = submissions;
      })
    });
  });
