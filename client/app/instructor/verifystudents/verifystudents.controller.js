'use strict';

angular.module('venueApp')
  .controller('VerifystudentsCtrl', function ($scope, Auth, User) {
    $scope.message = 'Hello';

    $scope.verifyStudents = [{firstName:"seve", lastName:"ibarlz"}, {firstName:"seve", lastName:"ibarlz"}, {firstName:"seve", lastName:"ibarlz"}];

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      User.getFullSections({id:$scope.user._id})
      .$promise.then((sections) => {
        $scope.sections = sections;
        console.log(sections)
      });
    });

  });
