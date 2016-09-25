'use strict';
const angular = require('angular');
import NavbarComponent from './navbar.controller';

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: 'NavbarComponent as nav'
  })
  .controller('NavbarComponent', NavbarComponent)
  .name;
