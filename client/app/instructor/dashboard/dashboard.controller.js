'use strict';

angular.module('venueApp')
  .controller('InstructorDashboardCtrl', ($scope, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.courses = [];
    $scope.events = [];

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      User.getCourses({id:$scope.user._id})
      .$promise.then((courses) => {
        $scope.courses = courses;
      });
    });

  });
