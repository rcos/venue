'use strict';

angular.module('venueApp')
  .controller('StudentCoursesCtrl', function ($scope, User) {
    User.get({withEvents: true}, (user)=>{
      $scope.user = user;
    });
  });
