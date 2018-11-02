'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/ta/courses', {
      template: require('./studentcourses.html'),
      controller: 'StudentCoursesCtrl',
      authenticate: 'ta'
    });
}
