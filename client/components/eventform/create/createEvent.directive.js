'use strict';

export function createEvent() {
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
  }
