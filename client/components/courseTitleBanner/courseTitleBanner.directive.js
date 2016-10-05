'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';
import pictureBanner from '../pictureBanner/pictureBanner.directive';

export default angular.module('directives.courseTitleBanner', [showImage, pictureBanner])
  .directive('courseTitleBanner', function ($http) {
    "ngInject";
    return {
      templateUrl: 'components/courseTitleBanner/courseTitleBanner.html',
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
      templateUrl: 'components/courseTitleBanner/courseTitleBannerBasic.html',
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
      templateUrl: 'components/courseTitleBanner/courseTitleBannerBase.html',
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
