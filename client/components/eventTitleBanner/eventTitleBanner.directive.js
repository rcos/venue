'use strict';

angular.module('venueApp')
  .directive('eventTitleBanner', function ($http) {
    return {
      templateUrl: 'components/eventTitleBanner/eventTitleBanner.html',
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
      templateUrl: 'components/eventTitleBanner/eventTitleBannerBasic.html',
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
      templateUrl: 'components/eventTitleBanner/eventTitleBannerBase.html',
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
