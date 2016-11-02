'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/student/courses', {
      template: require('./studentcourses.html'),
      controller: 'StudentCoursesCtrl',
      authenticate: 'student'
    });
}
