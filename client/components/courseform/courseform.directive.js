'use strict';

angular.module('venueApp')
  .directive('courseform', function () {
    return {
      templateUrl: 'components/courseform/courseform.html',
      controller: 'CourseFormCtrl',
      bindToController:true,
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
