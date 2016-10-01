// https://github.com/angular-ui/angular-google-maps/blob/master/example/assets/scripts/controllers/issue-624-drawing-manager.js
'use strict';
export function SelectEventFormCtrl($scope, Auth, EventInfo, User, SectionEvent, Upload){
    "ngInject";
    $scope.eventContainer.info = {};
    $scope.event = $scope.eventContainer.info;

    EventInfo.getAll({}, (eventinfos) => {
      $scope.eventinfos = eventinfos;
    });

    $scope.useEvent = function(event) {
      $scope.selectingEvent = false;
      $scope.event = event;
      $scope.eventContainer.info = event;
      if ($scope.onSubmit){
        $scope.onSubmit({create:false});
      }
    };

    $scope.createEvent = function(){
      if ($scope.onSubmit){
        $scope.onSubmit({create:true});
      }
    };
  };
