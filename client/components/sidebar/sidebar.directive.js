'use strict';
const angular = require('angular');
import {
  SidebarController
} from './sidebar.controller';

export default angular.module('directives.sidebar', [])
  .controller('SidebarController', SidebarController)
  .directive('sidebar', function() {
    return {
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'E',
      controller: 'SidebarController'
    };
  })
  .name;
