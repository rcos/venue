'use strict';

angular.module('venueApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/instructor/courses/:id/sections/:sectionId', {
        templateUrl: 'app/instructor/courses/sections/view/sectionview.html',
        controller: 'InstructorSectionViewCtrl',
        authenticate: 'instructor'
      });
  });
