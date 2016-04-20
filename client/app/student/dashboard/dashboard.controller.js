'use strict';

angular.module('venueApp')
  .controller('StudentDashboardCtrl', ($scope, $location, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.courses = [];
    $scope.events = [];

    Auth.getCurrentUser((user) => {
      $scope.user = user;

      User.get({id: user._id, withCourses:true, withEvents: true}, (usr) => {
        $scope.user = usr;
      });
    });

    $scope.goToUploadForEvent = (event) => {
      $location.path("/student/upload/" + event._id);
    };

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
  });
