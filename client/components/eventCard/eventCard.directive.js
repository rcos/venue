'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';

export default angular.module('directives.eventCard', [showImage])
  .directive('eventCard', function($location){
    "ngInject";
    return {
      template: require('./eventCard.html'),
      restrict: 'EA',
      scope: {
        selected: '=',
        data: '=',
        short: '=',
        sections: '=',
        preview: '=',
        linkEnabled: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element) {
        $scope.goToSectionEvent = (event) => {
          return "/events/" + event._id;
        };
        $scope.goToEventInfo = (data) => {
          if ($scope.linkEnabled === false){
            return "#";
          }
          return "/eventInfo/" + data._id;
        };

      }
    };
  })
  .name;
