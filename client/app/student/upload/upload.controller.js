'use strict';
export default class UploadCtrl {

  /*@ngInject*/
  constructor($scope, $location, SectionEvent) {
    $scope.events = [];
    $scope.eventId = "";

    SectionEvent.getAll({onlyUserSections:'me',withEventInfo:true,withSection:true},(events)=>{
      $scope.events = events;
      $scope.eventsLength = angular.equals(events,{})?0:1

    });

    $scope.goToUploadForEvent = (event) =>{
      $location.path("/student/upload/" + event.sectionEvents[0]._id);
    };
  }
}
