'use strict';
export default class UploadCtrl {

  /*@ngInject*/
  constructor($scope, $location, SectionEvent) {
    $scope.events = [];
    $scope.eventId = "";

    SectionEvent.getAll({onlyUserSections:'me',withEventInfo:true,withSection:true},(events)=>{
      $scope.events = events;
      $scope.eventsLength = angular.equals(events,{})?0:1
      var eventsList = [];
      for (var key in $scope.events) {
        // skip loop if the property is from prototype
        if (!$scope.events.hasOwnProperty(key) || !$scope.events[key]._id) continue;
        eventsList.push($scope.events[key]);
      }
      $scope.events = eventsList;

    });

    $scope.goToUploadForEvent = (event) =>{
      $location.path("/ta/upload/" + event.sectionEvents[0]._id);
    };
  }
}
