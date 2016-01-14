'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/newevent', {
        templateUrl: 'app/instructor/newevent/newevent.html',
        controller: 'NeweventCtrl'
      });
  });
