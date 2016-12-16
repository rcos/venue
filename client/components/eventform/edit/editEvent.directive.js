'use strict';

export function editEvent() {
    return {
      template: require('./editEvent.html'),
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
