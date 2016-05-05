'use strict';

angular.module('venueApp')
  .directive('eventCard', ($location) => {
    return {
      templateUrl: 'components/eventCard/eventCard.html',
      restrict: 'EA',
      scope: {
        data: '=',
        short: '=',
        sections: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
        $scope.goToSectionEvent = (event) => {
          $location.path("/events/" + event._id);
        };
      }
    };
  });
