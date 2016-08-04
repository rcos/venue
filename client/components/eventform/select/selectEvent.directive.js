'use strict';

angular.module('venueApp')
  .directive('selectEvent', function () {
    return {
      templateUrl: 'components/eventform/select/selectEvent.html',
      controller: 'SelectEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
      }
    };
  });
