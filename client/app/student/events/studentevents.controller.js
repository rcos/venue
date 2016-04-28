'use strict';

angular.module('venueApp')
  .controller('StudentEventsCtrl', function ($scope, $location, User, SectionEvent) {
    SectionEvent.getAll({onlyUserSections:'me',withEventInfo:true,withSection:true},(events)=>{
      $scope.events = events;
    });
    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };

  });
