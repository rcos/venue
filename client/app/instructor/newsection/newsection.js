'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/newsection', {
        templateUrl: 'app/instructor/newsection/newsection.html',
        controller: 'NewSectionCtrl'
      });
  });
