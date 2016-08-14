'use strict';

angular.module('venueApp')
  .controller('InstructorCoursesCtrl', function ($scope, $location, User) {
    User.get({withCourses: true}, (user)=>{
      $scope.user = user;
      $scope.anyCourses = angular.equals(user.courses,{})?0:1

    });

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
  });
