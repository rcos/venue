'use strict';
export default class StudentCoursesCtrl {

  /*@ngInject*/
  constructor($scope, $location, User) {
    $scope.anyCourses = true;
    User.get({withCourses: true}, (user)=>{
      $scope.user = user;
      $scope.anyCourses = angular.equals(user.courses,{})?0:1
    });
    $scope.goToCourse = function(course){
      $location.path("/courses/" + course._id);
    };
  }
}
