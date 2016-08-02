'use strict';

angular.module('venueApp')
  .controller('EditEventsCtrl', function ($scope, $location, $routeParams, SectionEvent, Auth) {
    Auth.getCurrentUser((user) => $scope.user = user);

    $scope.event = {info:{}};
    $scope.assignment = {};
    $scope.eventId = $routeParams.id;

    $scope.updateEvent = function(){
      SectionEvent.get({
        id: $routeParams.id,
        withEventInfo: true,
        withEventInfoAuthor: true,
        withSectionCourse: true,
        withAuthor: true,
        withSection: true
      },
      sectionEvent => {
        $scope.event = {info:sectionEvent.info};
      },
      err => {
        $scope.err = err;
      });
    };

    $scope.doneEdit = function(){
      $location.path("/events/" + $scope.eventId);
    }
    $scope.updateEvent();

  });
