'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';
import pictureBanner from '../pictureBanner/pictureBanner.directive';
import commaList from '../commaList/commaList.directive';

export default angular.module('directives.courseTitleBanner', [showImage, pictureBanner,commaList])
  .directive('courseTitleBanner', function ($http) {
    "ngInject";
    return {
      template: require('./courseTitleBanner.html'),
      restrict: 'EA',
      scope: {
        course: '=',
        section: '=',
        link: '@'
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
      }
    };
  })
  .directive('courseTitleBannerBasic', function ($http) {
    return {
      template: require('./courseTitleBannerBasic.html'),
      restrict: 'EA',
      scope: {
        course: '=',
        section: '=',
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
      }
    };
  })
  .directive('courseTitleBannerBase', function ($http) {
    return {
      template: require('./courseTitleBannerBase.html'),
      restrict: 'EA',
      scope: {
        course: '=',
        section: '=',
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
        $scope.printNames = function(element){
          return element.firstName + " " + element.lastName;
        }
      }
    };
  })
  .name;
