'use strict';

angular.module('venueApp')
  .controller('StudentEventsCtrl', function ($scope, User) {
    User.get({withEvents: true}, (user)=>{
      $scope.user = user;
    });
  });
