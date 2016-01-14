'use strict';

angular.module('venueApp')
  .controller('InstructorCoursesCtrl', function ($scope, User) {
    User.get({withCourses: true}, (user)=>{
      $scope.user = user;
    });
  });
