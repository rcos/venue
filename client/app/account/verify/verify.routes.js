'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/verify/resendEmail', {
      template: require('./resendEmail/resendEmail.html'),
      controller: 'ResendEmailCtrl'
    })
    .when('/verify/forgotPassword', {
      template: require('./forgotPassword/forgotPassword.html'),
      controller: 'ForgotPasswordCtrl'
    })
    .when('/verify/resetPassword/:id', {
      template: require('./resetPassword/resetPassword.html'),
      controller: 'ResetPasswordCtrl'
    })
    .when('/verify/:id', {
      template: require('./verify.html'),
      controller: 'VerifyAccountCtrl'
    });
}
