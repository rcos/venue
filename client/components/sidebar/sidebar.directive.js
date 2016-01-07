'use strict';

angular.module('venueApp')
  .directive('sidebar', () => ({
    templateUrl: 'components/sidebar/sidebar.html',
    restrict: 'E',
    controller: 'SidebarController'
  }));
