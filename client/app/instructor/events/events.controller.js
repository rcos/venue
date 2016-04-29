'use strict';

angular.module('venueApp')
  .controller('InstructorEventsCtrl', ($scope, $routeParams, $location, User, SectionEvent, Util) => {

    $scope.user = {};
    $scope.events = [];

    User.get({withEvents: true, withEventSections: true}, (user) => {
      $scope.user = user;
      $scope.sections = user.sections;
      $scope.events = user.events;
    });

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };


  });
