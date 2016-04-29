'use strict';

angular.module('venueApp')
  .controller('InstructorDashboardCtrl', ($scope, $routeParams, $location, User, Auth, Util) => {

    User.get({withCourses:true, withEvents: true, withEventSections: true}, (user) => {
      $scope.user = user;
      $scope.events = user.events;
      $scope.courses = user.courses;
    });

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };

  });
