'use strict';
export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/courses', {
      template: require('./instructorcourses.html'),
      controller: 'InstructorCoursesCtrl',
      authenticate: 'instructor'
    });

}
