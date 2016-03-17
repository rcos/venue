'use strict';

angular.module('venueApp')
  .controller('StudentEventsCtrl', function ($scope, User, SectionEvent) {
    SectionEvent.getAll({onlyUserSections:'me',withEventInfo:true,withSection:true},(events)=>{
      $scope.events = events;
    });
  });
