'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/courses/:id/sections/create', {
      template: require('./create/newsection.html'),
      controller: 'NewSectionCtrl',
      authenticate: 'instructor'
    })
    .when('/courses/:id/sections/:sectionId/edit', {
      template: require('./edit/sectionedit.html'),
      controller: 'SectionEditCtrl',
      authenticate: 'instructor'
    })
    .when('/courses/:id/sections/:sectionId', {
      template: require('./view/sectionview.html'),
      controller: 'SectionViewCtrl'
    });
}
