'use strict';

angular.module('venueApp')
  .directive('eventCard', function () {
    return {
      templateUrl: 'components/eventCard/eventCard.html',
      restrict: 'EA',
      scope: {
        data: '=',
        short: '@'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
