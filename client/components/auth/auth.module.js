'use strict';

angular.module('venueApp.auth', [
  'venueApp.constants',
  'venueApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
