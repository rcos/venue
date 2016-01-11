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
      User.get({id:$scope.user._id, getSections:true, withPendingStudents: true, getEvents:true})
      .$promise.then((user) => {
        console.log(user);
        $scope.sections = user.sections;
      });

      // User.getEvents({id:$scope.user._id})
      // .$promise.then((events) => {
      //   $scope.events = events;
      //
      // });
    }


  });
