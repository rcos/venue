'use strict';

angular.module('venueApp')
  .directive('student', function () {
    return {
      templateUrl: 'app/student/student.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
