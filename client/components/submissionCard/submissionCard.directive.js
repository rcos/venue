'use strict';

angular.module('venueApp')
  .directive('submissionCard', ($location) => {
    return {
      templateUrl: 'components/submissionCard/submissionCard.html',
      restrict: 'EA',
      scope: {
        selected: '=',
        data: '=',
        short: '=',
        sections: '=',
        preview: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
        
      }
    };
  });
