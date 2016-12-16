'use strict';
const angular = require('angular');

export default angular.module('directives.sortArrow', [])
  .directive('sortArrow', function($location){
    "ngInject";
    return {
      template: require('./sortArrow.html'),
      scope: {
        sortorder: '=',
        sortby: '@',
        text: '@',
        icon: '@'
      },
      restrict: 'A',
      controller: function ($scope, $element) {
        $scope.setSortOrder = function(field){
          if (field === $scope.sortorder){
            $scope.sortorder = '-' + field;
          } else{
            $scope.sortorder = field;
          }
        };
      }
    };
  })
  .name;
