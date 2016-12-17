'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/', {
    template: require('./main.html'),
    controller: 'MainController',
  });
};
