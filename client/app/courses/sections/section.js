'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses/:id/sections/create', {
        templateUrl: 'app/courses/sections/create/newsection.html',
        controller: 'NewSectionCtrl',
        authenticate: 'instructor'
      })
      .when('/courses/:id/sections/:sectionId', {
        templateUrl: 'app/courses/sections/view/sectionview.html',
        controller: 'SectionViewCtrl'
      });
  });
