'use strict';

angular.module('venueApp')
  .directive('instructor', function () {
    return {
      templateUrl: 'app/instructor/instructor.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
