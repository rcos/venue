'use strict';
export default class NewSectionCtrl {

  /*@ngInject*/
  constructor($scope, Course, $http, $routeParams) {
    Course.get({id: $routeParams.id}, (course) => {
      $scope.course = course;
      $scope.coursesLoaded  = true;
    });
  }
}
