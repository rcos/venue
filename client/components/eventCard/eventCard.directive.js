'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';

export default angular.module('directives.eventCard', [showImage])
  .directive('eventCard', function($location){
    "ngInject";
    return {
      templateUrl: 'components/eventCard/eventCard.html',
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
        $scope.goToSectionEvent = (event) => {
          $location.path("/events/" + event._id);
        };
        $scope.goToEventInfo = (data) => {
          $location.path("/eventInfo/" + data._id);
        };

      }
    };
  })
  .name;
