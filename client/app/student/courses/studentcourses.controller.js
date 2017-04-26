'use strict';
export default class StudentCoursesCtrl {

  /*@ngInject*/
  constructor($scope, $location, User) {
    $scope.anyCourses = true;
    User.get({withCourses: true}, (user)=>{
      $scope.user = user;
      $scope.anyCourses = angular.equals(user.courses,{})?0:1
      var courseList = [];
      for (var key in $scope.user.courses) {
          // skip loop if the property is from prototype
          if (!$scope.user.courses.hasOwnProperty(key) || !$scope.user.courses[key]._id) continue;
          courseList.push($scope.user.courses[key]);
      }
      $scope.user.courses = courseList;
    });
  }
}
