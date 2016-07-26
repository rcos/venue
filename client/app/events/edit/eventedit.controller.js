'use strict';

angular.module('venueApp')
  .controller('EventsCtrl', function ($scope, $location, $routeParams, SectionEvent, Auth) {
    $scope.assignment = {};
    Auth.getCurrentUser((user) => $scope.user = user);
    $scope.eventId = $routeParams.id;

    $scope.updateEvent = function(){
      $scope.event = SectionEvent.get({
        id: $routeParams.id,
        withEventInfo: true,
        withEventInfoAuthor: true,
        withSectionCourse: true,
        withAuthor: true,
        withSection: true
      },
        sectionEvent => {
          $scope.event = sectionEvent;
        },
        err => {
          $scope.err = err;
        });
    };

    $scope.editDone = function(){
      $location.path("/events/" + $scope.eventId);
    };

    $scope.updateEvent();
  });
