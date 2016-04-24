'use strict';

angular.module('venueApp')
  .controller('UploadCtrl', function ($scope, $location, User) {

    $scope.user = {};
    $scope.events = [];
    $scope.eventId = "";
    $scope.imgWidth = window.innerWidth/5;

    User.get({withSections:true, withEvents: true, withSectionsCourse:true}, (user) => {
      $scope.user = user;
      $scope.events = user.events;
    });

    $scope.goToUploadForEvent = (event) =>{
      $location.path("/student/upload/" + event.sections[0]._id);
    };
  });
