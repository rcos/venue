'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/courses/:id/sections/:sectionId', {
      template: require('./sectionview.html'),
      controller: 'InstructorSectionViewCtrl',
      authenticate: 'instructor'
    });
}
