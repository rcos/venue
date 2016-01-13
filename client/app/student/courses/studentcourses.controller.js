'use strict';

angular.module('venueApp')
  .controller('StudentCoursesCtrl', function ($scope, User) {
    User.get({withCourses: true}, (user)=>{
      $scope.user = user;
    });
  });
