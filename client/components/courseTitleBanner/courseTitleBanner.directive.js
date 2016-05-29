'use strict';

angular.module('venueApp')
  .directive('courseTitleBanner', function ($http) {
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
      }
    };
  });
