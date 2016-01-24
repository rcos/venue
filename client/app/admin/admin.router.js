'use strict';

angular.module('venueApp.admin')
  .config(function($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        authenticate: 'admin'
      });
  });
