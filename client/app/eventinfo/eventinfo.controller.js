'use strict';
export default class EventInfoCtrl {
  /*@ngInject*/
  constructor($scope, $location, $routeParams, EventInfo, Auth) {
    $scope.assignment = {};
    Auth.getCurrentUser((user) => {$scope.user = user});
    $scope.eventId = $routeParams.id;

    $scope.event = EventInfo.get({
      id: $scope.eventId,
      withAuthor: true,
      withSectionEvents: true,
      withCourses: true
    },
      event => {
        $scope.event = event;
        if ($scope.user.isInstructor){
          $scope.event.yourEvents = $scope.event.sectionEvents.filter((sectionEvent)=> sectionEvent.section.instructors.indexOf($scope.user._id) !== -1);

          $scope.event.otherEvents = $scope.event.sectionEvents.filter((sectionEvent)=> sectionEvent.section.instructors.indexOf($scope.user._id) == -1);
        }
        else{
          $scope.event.yourEvents = $scope.event.sectionEvents.filter((sectionEvent)=> sectionEvent.section.students.indexOf($scope.user._id) !== -1);

          $scope.event.otherEvents = $scope.event.sectionEvents.filter((sectionEvent)=> sectionEvent.section.students.indexOf($scope.user._id) == -1);

        }
      },
      err => {
        $scope.err = err;
      });

    $scope.editEvent = function(){
      return "/eventInfo/edit/" + $scope.eventId;
    };

    $scope.viewSection = (sectionEvent) => {
      return "/instructor/courses/"+sectionEvent.section.course._id+"/sections/"+sectionEvent.section._id;
    };

    $scope.viewSectionEvent = (sectionEvent) => {
      return "/events/"+sectionEvent._id
    };

    $scope.viewNewEvent = (sectionEvent) => {
      return "/instructor/newevent";
    };

  }
};
