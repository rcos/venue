'use strict';

angular.module('venueApp')
  .controller('InstructorEventsCtrl', ($scope, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.events = [];

    Auth.getCurrentUser(function(user){
      $scope.user = user;
      getEvents();
    });

    function getEvents(){
      User.getEvents({id:$scope.user._id})
      .$promise.then((events) => {
        $scope.events = events;
      });
    }


  });
