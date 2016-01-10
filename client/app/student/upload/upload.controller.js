'use strict';

angular.module('venueApp')
  .controller('UploadCtrl', function ($scope, Auth, User, Upload, geolocation) {

    $scope.user = {};
    $scope.events = [];
    $scope.eventId = "";
    $scope.imgWidth = window.innerWidth/5;

    Auth.getCurrentUser(function(user){
      $scope.user = user;
      // User.getEvents({id:$scope.user._id})
      // .$promise.then((events) => {
      //   $scope.events = events;
      // });
      $scope.events = [{_id:'56918d2f9a8ed7ee3d955c77', title:"test"}];
    });

    geolocation.getLocation()
      .then((data) => {
        $scope.coords = [data.coords.longitude, data.coords.latitude]; // [<longitude>, <latitude>]
      });

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
              },
              objectKey: '.k',
              arrayKey: '[i]'
          }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $scope.progress = progressPercentage;

          }).success(function (data, status, headers, config) {
            console.log("Successful!");
          });
      }
    };
  });
