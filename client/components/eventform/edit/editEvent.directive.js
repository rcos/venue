'use strict';

export function editEvent() {
    return {
      templateUrl: 'components/eventform/edit/editEvent.html',
      controller: 'EditEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
      }
    };
  };
