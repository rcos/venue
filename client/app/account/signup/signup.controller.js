'use strict';
export default class SignupController {

  /*@ngInject*/
  constructor($scope, $location, Auth) {
      $scope.user = {};
      $scope.errors = {};

      $scope.register = (form)=>{
          console.log(form);
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
              $location.path('/verify');
            })
            .catch(err => {
              err = err.data;
              $scope.errors = {};
              console.log(err);
              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, (error, field) => {
                console.log(form.$valid);
                console.log(field)
                form[field].$setValidity('mongoose', false);
                console.log(form.$valid);
                $scope.errors[field] = error.message;
                // form[field].$setValidity('mongoose', true);
              });
            });
          }
      };
  }
}
