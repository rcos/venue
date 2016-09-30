'use strict';
const angular = require('angular');

export default angular.module('directives.sidebar', [])
  .directive('sidebar', function() {
    return {
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'E',
      controller: 'SidebarController'
    };
  })
  .name;
