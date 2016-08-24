'use strict';

angular.module('venueApp')
  .controller('SubmitCtrl', function ($scope, $routeParams, $location, SectionEvent, User, Upload, geolocation) {

    $scope.events = [];
    $scope.eventId = "";
    $scope.imgWidth = window.innerWidth/5;

    User.get({withSections:true, withSectionsCourse:true}, (user) => {
      $scope.user = user;
    });

    SectionEvent.get({id: $routeParams.eventid, withEventInfo:true, withSection:true, withCourse:true }, sectionEvent => {
      $scope.sectionEvent = sectionEvent;
    });

    geolocation.getLocation()
      .then((data) => {
        $scope.coords = [data.coords.longitude, data.coords.latitude]; // [<longitude>, <latitude>]
      });

    $scope.submitEvent = (form)=>{
      $scope.submitted = true;
      if (form.$valid && $scope.files && $scope.files.length) {
        var data = {
          userId: $scope.user._id,
          eventId: $routeParams.eventid,
          files: $scope.files,
          content: $scope.content,
          title: $scope.title
        };
        if($scope.coords){
          data.coordinates = $scope.coords;
        }
          Upload.upload({
              url: '/api/submissions/',
              data: data,
              objectKey: '.k',
              arrayKey: '[i]'
          }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total, 10);
              $scope.progress = progressPercentage;

          }).success(function (imageSubmitted) {
            $scope.success = true;
          });
      }
    };

  });
