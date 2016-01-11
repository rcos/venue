'use strict';

angular.module('venueApp', [
  'venueApp.auth',
  'venueApp.admin',
  'venueApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'ngFileUpload',
  'geolocation',
  'dibari.angular-ellipsis'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
