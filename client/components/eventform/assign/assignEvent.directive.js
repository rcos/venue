'use strict';

export function assignEvent() {
    return {
      template: require('./assignEvent.html'),
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
