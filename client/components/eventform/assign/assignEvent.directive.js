'use strict';

angular.module('venueApp')
  .directive('assignEvent', function () {
    return {
      templateUrl: 'components/eventform/assign/assignEvent.html',
      controller: 'AssignEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
      }
    };
  });
