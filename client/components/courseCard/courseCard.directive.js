'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';
import courseBanner from '../courseBanner/courseBanner.directive';

export default angular.module('directives.courseCard', [showImage, courseBanner])
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
