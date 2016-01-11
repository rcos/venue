'use strict';

angular.module('venueApp')
  .directive('sectionform', function () {
    return {
      templateUrl: 'components/sectionform/sectionform.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
