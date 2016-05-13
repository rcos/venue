'use strict';

angular.module('venueApp')
  .controller('AdminController', function ($scope, User, Upload) {
    $scope.users = User.query();

    $scope.uploadUserCSV = function(file){

      if (!file){
        console.log("null file");
        return;
      }

      Upload.upload({
          url: '/api/users/csv',
          data: {
            files: [file]
          },
          objectKey: '.k',
          arrayKey: '[i]'
      }).success(((response) => {
        console.log("success", response);
      }));
    };

    $scope.delete = function(user) {
      user.$remove();
      $scope.users.splice(this.users.indexOf(user), 1);
    }

  });
