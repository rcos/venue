'use strict';

angular.module('venueApp')
  .controller('InstructorDashboardCtrl', ($scope, $routeParams, $location, User, Auth, Util) => {

    User.get({withCourses:true, withEvents: true, withEventSections: true}, (user) => {
      $scope.user = user;
      $scope.events = user.events;
      $scope.courses = user.courses;
      $scope.coursesLength = angular.equals(user.courses,{})?0:1
      $scope.eventsLength = angular.equals(user.events, {})?0:1

    });

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
  });
