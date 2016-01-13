'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/courses/:id/sections/create', {
        templateUrl: 'app/courses/sections/create/newsection.html',
        controller: 'NewSectionCtrl'
      })
      .when('/courses/:id/sections/:sectionId/edit', {
        templateUrl: 'app/courses/sections/edit/sectionedit.html',
        controller: 'SectionEditCtrl'
      });
  });
