'use strict';

angular.module('venueApp')
  .controller('StudentDashboardCtrl', ($scope, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.courses = [];
    $scope.events = [];

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      getSectionsEvents();
    });

    function getSectionsEvents(){
      User.getSections({id:$scope.user._id})
      .$promise.then((sections) => {
        $scope.sections = sections;
      });

      User.getEvents({id:$scope.user._id})
      .$promise.then((events) => {
        $scope.events = events;

      });
    }


  });
