'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/events/:id', {
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl'
      });
  });
