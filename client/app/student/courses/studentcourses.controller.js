'use strict';

angular.module('venueApp')
  .controller('StudentCoursesCtrl', function ($scope, User, $location) {
    User.get({withCourses: true}, (user)=>{
      $scope.user = user;
      $scope.anyCourses = angular.equals(user.courses,{})?0:1
    });
    $scope.goToCourse = function(course){
      $location.path("/courses/" + course._id);
    };
  });
