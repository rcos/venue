'use strict';

angular.module('venueApp')
  .controller('InstructorDashboardCtrl', ($scope, $routeParams, $location, User, Auth, Util) => {

    User.get({withSections:true, withEvents: true, withSectionsCourse:true}, (user) => {
      $scope.user = user;
      $scope.sections = user.sections;
      $scope.events = addEventSectionNumbers(user.events);
      Util.convertDates($scope.events)
      $scope.courses = groupByCourse($scope.sections);
    });

    function groupByCourse(sections){
      var courses = {}
      sections.forEach((section)=>{
        if(courses[section.course._id]){
          courses[section.course._id].sections.push(section);
        }
        else{
          courses[section.course._id] = section.course;
          courses[section.course._id].sections = [section];
        }
        delete section.course;
      })
      return courses;
    }

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

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };

  });
