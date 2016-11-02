'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/events/:id', {
      template: require('./events.html'),
      controller: 'EventsCtrl'
    });
}
