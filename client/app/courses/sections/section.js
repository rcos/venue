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
        controller: 'SectionViewCtrl',
        authenticate: 'instructor'
      })
      .when('/courses/:id/sections/:sectionId/edit', {
        templateUrl: 'app/courses/sections/edit/sectionedit.html',
        controller: 'SectionEditCtrl',
        authenticate: 'instructor'
      });
  });
