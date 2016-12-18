'use strict';
import commaList from '../commaList/commaList.directive';
import pictureBanner from '../pictureBanner/pictureBanner.directive';

export default angular.module('directives.eventTitleBanner', [commaList,pictureBanner])
  .directive('eventTitleBanner', function ($http) {
    return {
      template: require('./eventTitleBanner.html'),
      restrict: 'EA',
      scope: {
        event: '=',
        sectionEvent: '=',
        link: '@'
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
      }
    };
  })
  .directive('eventTitleBannerBasic', function ($http) {
    return {
      template: require('./eventTitleBannerBasic.html'),
      restrict: 'EA',
      scope: {
        event: '=',
        sectionEvent: '=',
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
      }
    };
  })
  .directive('eventTitleBannerBase', function ($http) {
    return {
      template: require('./eventTitleBannerBase.html'),
      restrict: 'EA',
      scope: {
        event: '=',
        sectionEvent: '=',
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
        $scope.printNames = function(element){
          return element.firstName + " " + element.lastName;
        }

      }
    };
  });
