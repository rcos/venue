'use strict';

angular.module('venueApp')
  .controller('EventsCtrl', function ($scope, $location, $routeParams, SectionEvent, User) {

    User.get((user)=>{
      $scope.user = user;
    });

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

    $scope.goToEventUpload = (id) => {
      $location.path("/student/upload/" + id);
    };

    $scope.deleteEvent = (event)=> {
      if (confirm("This will also delete all sections submissions, are you sure you'd like to delete this event?")) {
        SectionEvent.delete({id:event._id}, (response)=>{
          $scope.events.splice($scope.events.indexOf(event), 1);
          $location.path("/instructor/events");
        })
      }
    }
  });
