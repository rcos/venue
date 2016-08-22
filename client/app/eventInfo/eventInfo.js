'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/eventInfo/edit/:id', {
        templateUrl: 'app/eventInfo/edit/eventedit.html',
        controller: 'EditEventsCtrl'
      })
      .when('/eventInfo/:id', {
        templateUrl: 'app/eventInfo/eventInfo.html',
        controller: 'EventInfoCtrl'
      });
  });
