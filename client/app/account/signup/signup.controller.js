'use strict';
export default class SignupController {

  /*@ngInject*/
  constructor($scope, $location, Auth) {
      $scope.user = {};
      $scope.errors = {};

      $scope.register = (form)=>{
          $scope.submitted = true;
          if (form.$valid) {
            Auth.createUser({
              firstName: $scope.user.firstName,
              lastName: $scope.user.lastName,
              email: $scope.user.email,
              password: $scope.user.password,
              isInstructor: false
            })
            .then(() => {
              $location.path('/verify/emailVerification');
            })
            .catch(err => {
              err = err.data;
              $scope.errors = {};

              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, (error, field) => {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
              });
            });
          }
      };
  }
}
