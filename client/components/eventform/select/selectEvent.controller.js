// https://github.com/angular-ui/angular-google-maps/blob/master/example/assets/scripts/controllers/issue-624-drawing-manager.js
'use strict';

angular.module('venueApp')
  .controller('SelectEventFormCtrl', function($scope, Auth, EventInfo, User, SectionEvent, Upload){
    $scope.eventContainer.info = {};
    $scope.event = $scope.eventContainer.info;

    EventInfo.getAll({}, (eventinfos) => {
      $scope.eventinfos = eventinfos;
    });

    $scope.useEvent = function(event) {
      console.log("useEvent");
      $scope.selectingEvent = false;
      $scope.event = event;
      $scope.eventContainer.info = event;
      console.log("$scope.eventContainer",$scope.eventContainer);
      $scope.onSubmit({create:false});
    };

    $scope.createEvent = function(){
      console.log("createEvent");
      $scope.onSubmit({create:true});
    };

  });
