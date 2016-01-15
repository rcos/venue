'use strict';

angular.module('venueApp')
  .directive('eventform', function () {
    return {
      templateUrl: 'components/eventform/eventform.html',
      controller: 'EventFormCtrl',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.updating = attrs.updating;
      }
    };
  });
