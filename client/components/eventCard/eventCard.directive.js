'use strict';

angular.module('venueApp')
  .directive('eventCard', function () {
    return {
      templateUrl: 'components/eventCard/eventCard.html',
      restrict: 'EA',
      scope: {
        data: '=',
        short: '=',
        sections: '=',
        click: '&'
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
      }
    };
  });
