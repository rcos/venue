'use strict';

angular.module('venueApp')
  .controller('EventsCtrl', function ($scope, $location, $routeParams, SectionEvent) {
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
      });

    $scope.goToEventUpload = (id) => {
      $location.path("/student/upload/" + id);
    };

  });
