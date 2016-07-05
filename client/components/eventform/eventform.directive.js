'use strict';

angular.module('venueApp')
  .directive('eventform', function () {
    return {
      templateUrl: 'components/eventform/eventform.html',
      controller: 'EventFormCtrl',
      restrict: 'E',
      scope: {
        "onEventInfoSubmit": "&"
      }, // isolated scope
      link: function (scope, element, attrs) {
        scope.updating = attrs.updating;
        scope.init();
      }
    };
  });
