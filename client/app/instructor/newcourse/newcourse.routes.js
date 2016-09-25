'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/instructor/newcourse', {
      template: require('./newcourse.html'),
      controller: 'NewCourseCtrl',
      authenticate: 'instructor'
    });
}
