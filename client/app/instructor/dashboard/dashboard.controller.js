'use strict';

angular.module('venueApp')
  .controller('InstructorDashboardCtrl', ($scope, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.courses = [];
    $scope.events = [];

    Auth.getCurrentUser(function(user){
      $scope.user = user;
      getCourses();
    });

    function getCourses(){
      User.getCourses({id:$scope.user._id})
      .$promise.then((courses) => {
        $scope.courses = courses;
      });
    }


  });
