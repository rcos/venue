'use strict';
'use strict';
export default class InstructorEventsCtrl {

  /*@ngInject*/
  constructor($scope, $location, SectionEvent) {
    SectionEvent.getAll({onlyUserSections:'me',withEventInfo:true,withSection:true},(events)=>{
      $scope.events = events;
      $scope.eventsArray = Object.keys(events)
        .map(eventId => events[eventId])
        .filter(evnt => evnt._id)
        .reduce((a,b) => a.concat(b), []);
    });

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };
  }
}
