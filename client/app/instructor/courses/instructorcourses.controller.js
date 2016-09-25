'use strict';
export default class InstructorCoursesCtrl {

  /*@ngInject*/
  constructor($scope, $location, User) {
    User.get({withCourses: true}, (user)=>{
      $scope.user = user;
      $scope.anyCourses = angular.equals(user.courses,{})?0:1

    });

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
  }
}
