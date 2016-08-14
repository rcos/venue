'use strict';

angular.module('venueApp')
  .controller('StudentSubmissionCtrl', ($scope, $routeParams, User, Auth, Submission) => {

    Submission.getAll({'onlyStudent':'me', 'withSection': true, 'withSectionCourse': true}, (submissions) => {
      $scope.submissions = submissions;
    });

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };

  });
