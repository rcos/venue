'use strict';

angular.module('venueApp')
  .controller('UploadCtrl', function ($scope, $location, SectionEvent) {

    $scope.events = [];
    $scope.eventId = "";

    SectionEvent.getAll({onlyUserSections:'me',withEventInfo:true,withSection:true},(events)=>{
      $scope.events = events;
    });

    $scope.goToUploadForEvent = (event) =>{
      $location.path("/student/upload/" + event.sectionEvents[0]._id);
    };
  });
