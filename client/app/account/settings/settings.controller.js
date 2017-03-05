'use strict';

export default class SettingsController {

  /*@ngInject*/
  constructor($scope, Auth, User) {
    $scope.Auth = Auth;
    $scope.message = {};
    $scope.choosing = false;
    $scope.emailAheadOptions = [{minutes:30, time:"30 minutes", applied:false},
                                {minutes:60, time:"1 hour", applied:false},
                                {minutes:120, time:"2 hours", applied:false}];

    User.get({withCourses: true}, (user)=>{

      $scope.emailPreferences = user.preferences;
      $scope.emailPreferences.unsubscribe = !$scope.emailPreferences.recieveEmails
      user.preferences.emailNotifyAheadMinutes.forEach(time => {
        $scope.emailAheadOptions.forEach(preference => {
          if(time == preference.minutes){
            preference.applied = true;
          }
        })
      })
    });

    $scope.updateEmailPreferences = (form) => {

      let emailPreferences = {recieveEmails: $scope.emailPreferences.unsubscribe}
      emailPreferences.emailNotifyAheadMinutes = $scope.emailAheadOptions.reduce((times, option) => {
        if(option.applied){
          return times.concat(option.minutes);
        }
        return times
      }, []);


      User.updateEmailPreferences(emailPreferences).$promise
        .then(() => {
          $scope.message.updateEmailPreferences = 'Email Settings successfully changed.';
        })
        $scope.choosing = false;

    }

    $scope.changePassword = (form) =>  {
      $scope.submitted = true;
      if (form.$valid) {
        $scope.Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(() => {
            $scope.message.changePassword = 'Password successfully changed.';
          })
          .catch(() => {
            form.password.$setValidity('mongoose', false);
            $scope.errors.changePassword = 'Incorrect password';
            $scope.message.changePassword = '';
          });
      }
    }

    $scope.disableNotifcations = () => {

      $scope.emailPreferences.unsubscribe = true;
      let emailPreferences = {recieveEmails: !$scope.emailPreferences.unsubscribe}
      emailPreferences = {emailNotifyAheadMinutes: []}
      User.updateEmailPreferences(emailPreferences).$promise
        .then(() => {
          $scope.message.updateEmailPreferences = 'Notfications Disabled.';
        })
        $scope.choosing = false;
        
    }

    $scope.enableNotifcations = () => {
      $scope.emailPreferences.unsubscribe = false;
      $scope.choosing = true;
      let emailPreferences = {recieveEmails: !$scope.emailPreferences.unsubscribe}

      User.updateEmailPreferences(emailPreferences).$promise
        .then(() => {
          $scope.message.updateEmailPreferences = 'Notifications Enabled';
        })

    }


  }

}
