'use strict';
const angular = require('angular');
import CourseFormCtrl from './courseform.controller';

export default angular.module('venueApp', [])
  .directive('courseform', function () {
    return {
      templateUrl: 'components/courseform/courseform.html',
      controller: 'CourseFormCtrl',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.updating = attrs.updating;
      }
    };
  })
  .controller('CourseFormCtrl', CourseFormCtrl)
  .name;
