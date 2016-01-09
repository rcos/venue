'use strict';

angular.module('venueApp')
  .controller('UploadCtrl', function ($scope, Auth, User, Upload, geolocation) {

    $scope.user = {};
    $scope.events = [];
    $scope.eventId = "";

    Auth.getCurrentUser(function(user){
      $scope.user = user;
      User.getEvents({id:$scope.user._id})
      .$promise.then((events) => {
        $scope.events = events;
      });
    });

    geolocation.getLocation()
      .then((data) => {
        $scope.coords = [data.coords.longitude, data.coords.latitude]; // [<longitude>, <latitude>]
        console.log($scope.coords);
      });

    $scope.imgWidth = window.innerWidth/5;

    $scope.submitEvent = (form)=>{
      $scope.submitted = true;
      if (form.$valid && $scope.files && $scope.files.length && $scope.coords) {
          Upload.upload({
              url: '/api/submissions/',
              data: {
                userId: $scope.user._id,
                eventId: $scope.eventSelected,
                files: $scope.files,
                coordinates: $scope.coords,
                content: $scope.content,
                title: $scope.title
              }
          }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $scope.progress = progressPercentage;

          }).success(function (data, status, headers, config) {
            console.log("Successful!");
          });
      }
    };
  });
