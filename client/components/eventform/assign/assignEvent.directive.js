'use strict';

export function assignEvent() {
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
  };
