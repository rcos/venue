'use strict';

angular.module('venueApp')
  .controller('UploadCtrl', function ($scope, Auth, Upload) {

    $scope.user = {};

    Auth.getCurrentUser(function(user){
      $scope.user = user;
    });

    $scope.imgWidth = window.innerWidth/5;
    console.log($scope.imgWidth);

    $scope.evnt = {};
    $scope.evnt._id = "123abc";

    $scope.$watch('files', () => {
      console.log($scope.files);
          // $scope.upload($scope.files);
      });

    $scope.submitEvent = (form)=>{
      $scope.submitted = true;
      if (form.$valid && $scope.files && $scope.files.length) {
          Upload.upload({
              url: '/api/submissions/',
              data: {
                userId: $scope.user._id,
                eventId: $scope.evnt._id,
                files: $scope.files
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
