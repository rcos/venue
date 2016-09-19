'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/courses', {
      template: require('./search/coursesearch.html'),
      controller: 'CourseSearchCtrl',
    })
    .when('/courses/:id', {
      template: require('./view/courseview.html'),
      controller: 'CourseViewCtrl'
    })
    .when('/courses/:id/edit', {
      template: require('./edit/courseedit.html'),
      controller: 'CourseEditCtrl',
      authenticate: 'instructor'
    });

}
