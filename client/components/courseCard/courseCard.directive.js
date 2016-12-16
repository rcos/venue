'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';
import pictureBanner from '../pictureBanner/pictureBanner.directive';

export default angular.module('directives.courseCard', [showImage, pictureBanner])
  .directive('courseCard', function ($http) {
    return {
      template: require('./courseCard.html'),
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
