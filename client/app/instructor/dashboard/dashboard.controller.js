'use strict';

angular.module('venueApp')
  .controller('InstructorDashboardCtrl', ($scope, $routeParams, $location, User, Auth, Util) => {

    User.get({withCourses:true, withEvents: true}, (user) => {
      $scope.user = user;
      $scope.events = uniqueEvents(user.events);
      // Util.convertDates($scope.events)
      $scope.courses = user.courses;
    });

    function uniqueEvents(events){
      var seen = {};
      return events.filter(function(item) {
          return seen.hasOwnProperty(item.info._id) ? false : (seen[item.info._id] = true);
      });
    }

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };

  });
