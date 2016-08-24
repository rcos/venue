import MainController from './main.controller';
import routing from './main.routes';
import uiRouter from 'angular-ui-router';

export default angular.module('venueApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  }).name;
