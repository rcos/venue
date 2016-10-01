'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';

import {
  CourseFormCtrl
} from './courseform.controller';

export default angular.module('directives.courseform', [showImage])
  .controller('CourseFormCtrl', CourseFormCtrl)
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
  .name;
