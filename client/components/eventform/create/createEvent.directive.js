'use strict';

angular.module('venueApp')
  .directive('createEvent', function () {
    return {
      templateUrl: 'components/eventform/create/createEvent.html',
      controller: 'CreateEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
        scope.loadData = function(){
        }
      }
    };
  });
