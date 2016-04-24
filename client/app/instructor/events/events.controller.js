'use strict';

angular.module('venueApp')
  .controller('InstructorEventsCtrl', ($scope, $routeParams, $location, User, SectionEvent, Util) => {

    $scope.user = {};
    $scope.events = [];

    User.get({withSections:true, withEvents: true, withSectionsCourse:true}, (user) => {
      $scope.user = user;
      $scope.sections = user.sections;
      $scope.events = addEventSectionNumbers(user.events);
      Util.convertDates($scope.events)
    });

    $scope.deleteEvent = (event)=> {
      if (confirm("This will also delete all sections submissions")) {
        SectionEvent.delete({id:event._id}, (response)=>{
          $scope.events.splice($scope.events.indexOf(event), 1);
        })
      }
    }
    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };

    function addEventSectionNumbers(sectionEvents){
      Object.keys(sectionEvents).forEach((eventId)=>{
        (sectionEvents[eventId].sections).forEach((section)=>{
          var sections = $scope.sections.filter((courseSection)=> {
            return courseSection._id == section.section})[0];
          section.sectionNumbers = sections.sectionNumbers;
          section.course = sections.course.name;
        })
      })
      return sectionEvents;
    }

  });
