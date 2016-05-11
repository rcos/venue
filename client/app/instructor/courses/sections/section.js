'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/courses/:id/sections/:sectionId/edit', {
        templateUrl: 'app/instructor/courses/sections/edit/sectionedit.html',
        controller: 'SectionEditCtrl',
        authenticate: 'instructor'
      })
      .when('/instructor/courses/:id/sections/:sectionId', {
        templateUrl: 'app/instructor/courses/sections/view/sectionview.html',
        controller: 'InstructorSectionViewCtrl',
        authenticate: 'instructor'
      });
  });
