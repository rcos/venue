'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/events/edit/:id', {
        templateUrl: 'app/events/edit/eventedit.html',
        controller: 'EventsCtrl'
      })
      .when('/events/:id', {
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl'
      });
  });
