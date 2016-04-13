'use strict';

angular.module('venueApp')
  .directive('courseCard', function () {
    return {
      templateUrl: 'components/courseCard/courseCard.html',
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
