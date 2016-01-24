'use strict';

angular.module('venueApp')
  .controller('AdminController', function ($scope, User) {
    $scope.users = User.query();

    $scope.delete = function(user) {
      user.$remove();
      $scope.users.splice(this.users.indexOf(user), 1);
    }
    
  });
