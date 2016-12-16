'use strict';

export function selectEvent() {
    return {
      template: require('./selectEvent.html'),
      controller: 'SelectEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
      }
    };
  };
