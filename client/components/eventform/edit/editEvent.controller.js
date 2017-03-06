// https://github.com/angular-ui/angular-google-maps/blob/master/example/assets/scripts/controllers/issue-624-drawing-manager.js
'use strict';
export function EditEventFormCtrl($scope, Auth, EventInfo, User, SectionEvent, Upload){
    "ngInject";
    $scope.today = new Date();
    $scope.today.setHours(0,0,0,0);

    $scope.success = false;
    $scope.mapLoaded = false;
    $scope.allShapes = [];
    $scope.place = {};
    var selectedShape = null;
    $scope.event = $scope.eventContainer.info || {};
    $scope.$watch('eventContainer', function(newValue, oldValue) {
        $scope.event = $scope.eventContainer.info || {};
        $scope.event.startDate = $scope.event.times ? new Date($scope.event.times[0].start) : new Date();
        $scope.event.endDate = $scope.event.times ? new Date($scope.event.times[0].end) : new Date();
    });

    if ($scope.event.times){
      $scope.event.startDate = $scope.event.times ? new Date($scope.event.times[0].start) : new Date();
      $scope.event.endDate = $scope.event.times ? new Date($scope.event.times[0].end) : new Date();
    }

    $scope.updateEventInfo = function(form){
      $scope.submitted = true;

      // Save the event information and send it to the api endpoint
      // Don't do it if the form is invalid or there are no shapes drawn
      if (form.$valid){
        $scope.eventInfo = {
          id: $scope.event._id,
          title: $scope.event.title,
          description: $scope.event.description,
          times:[{
            start: $scope.event.startDate,
            end: $scope.event.endDate
          }],
          files: [$scope.file],
          location: {
            address: $scope.event.location.address,
            description: $scope.event.location.description,
          }
        };

        //Upload the event
        Upload.upload({
          url: '/api/eventinfos/'+$scope.event._id,
          data: $scope.eventInfo,
          method: 'PUT',
          objectKey: '.k',
          arrayKey: '[i]'
        }).success( (response) => {
          $scope.eventContainer.info = response;
          $scope.submitted = false;
          if ($scope.onSubmit){
            $scope.onSubmit();
          }
        }).catch(err => {
          $scope.err = err.data;
        });
      };
    };

    $scope.openCalendar = function(e, prop) {
      e.preventDefault();
      e.stopPropagation();

      $scope.event[prop] = true;
    };
  };
