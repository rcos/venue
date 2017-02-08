'use strict';

export default class SettingsController {

  /*@ngInject*/
  constructor(Auth) {
    this.Auth = Auth;
    Auth.getCurrentUser((user) => {
      $scope.user = user;

      User.get({id: user._id, withCourses:true, withEvents: true, withEventSections: true}, (user) => {
        $scope.user = user;
        $scope.anyCourses = angular.equals(user.courses,{})?0:1

        $scope.anyEvents = angular.equals(user.events, {})?0:1

      });
    });
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}
