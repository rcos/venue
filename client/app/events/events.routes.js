'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/events/edit/:id', {
      template: require('./edit/eventedit.html'),
      controller: 'EditEventsCtrl'
    })
    .when('/events/:id', {
      template: require('./events.html'),
      controller: 'EventsCtrl'
    });
}
