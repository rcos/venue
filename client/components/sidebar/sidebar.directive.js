'use strict';
const angular = require('angular');

export default angular.module('venueApp', [])
  .directive('sidebar', function() {
    return {
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'E',
      controller: 'SidebarController'
    };
  })
  .name;
