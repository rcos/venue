'use strict';

angular.module('venueApp')
  .controller('UploadCtrl', function ($scope,$routeParams,  $location, SectionEvent, Auth, User, Upload, geolocation) {

    $scope.user = {};
    $scope.events = [];
    $scope.eventId = "";
    $scope.imgWidth = window.innerWidth/5;

    Auth.getCurrentUser(function(user){
      $scope.user = user;
      User.get({id: user._id, withSections:true, withEvents: true, withSectionsCourse:true}, (usr) => {
        $scope.user = usr;
        $scope.events = usr.events;
      });
    });

    geolocation.getLocation()
      .then((data) => {
        $scope.coords = [data.coords.longitude, data.coords.latitude]; // [<longitude>, <latitude>]
      });

    $scope.goToUploadForEvent = (event) =>{
      $location.path("/student/upload/" + event._id);
    };

    $scope.submitEvent = (form)=>{
      $scope.submitted = true;
      if (form.$valid && $scope.files && $scope.files.length && $scope.coords) {
          Upload.upload({
              url: '/api/submissions/',
              data: {
                userId: $scope.user._id,
                eventId: $routeParams.eventid,
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

          }).success(function (imageSubmitted) {
            $scope.success = true;
          });
      }
    };

    SectionEvent.get({
      id: $routeParams.eventid
    }, sectionEvent => {
      $scope.selectedEvent = sectionEvent;
      console.log(sectionEvent);
    });
  });
