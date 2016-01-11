'use strict';

angular.module('venueApp')
  .controller('InstructorEventsCtrl', ($scope, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.events = [];

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      User.get({id: user._id, withSections:true, withEvents: true, withSectionsCourse:true}, (usr) => {
        $scope.user = usr;
        $scope.events = usr.events;
        console.log(usr.events)
      });
    });

  });
