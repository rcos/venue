'use strict';

angular.module('venueApp')
  .directive('courseform', function () {
    return {
      templateUrl: 'components/courseform/courseform.html',
      controller: 'CourseFormCtrl',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.updating = attrs.updating;
        console.log(scope.updating);
      }
    };
  });
