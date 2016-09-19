import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {}

export default angular.module('venueApp.main', ['ngRoute'])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
