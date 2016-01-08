'use strict';

angular.module('venueApp')
  .controller('InstructorEventsCtrl', ($scope, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.events = [];

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      User.getEvents({id:$scope.user._id})
      .$promise.then((events) => {
        $scope.events = events;
      });
    });

  });
