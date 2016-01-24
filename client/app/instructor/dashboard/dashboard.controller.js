'use strict';

angular.module('venueApp')
  .controller('InstructorDashboardCtrl', ($scope, $routeParams, User, Auth, Util) => {

    User.get({withSections:true, withEvents: true, withSectionsCourse:true}, (user) => {
      $scope.user = user;
      $scope.sections = user.sections;
      $scope.events = user.events;
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

  });
