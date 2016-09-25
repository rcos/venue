'use strict';
const angular = require('angular');

export default angular.module('venueApp', [])
  .directive('courseCard', function ($http) {
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
  })
  .name;
