'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/login', {
      template: require('./login/login.html'),
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .when('/logout', {
      name: 'logout',
      referrer: '/',
      template: '',
      controller: function($location, $route, Auth) {
        var referrer = $route.current.params.referrer || $route.current.referrer || '/';
        Auth.logout();
        $location.path(referrer);
      }
    })
    .when('/settings', {
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'vm'
    })
    .when('/verify/resendEmail', {
      template: require('./verify/resendEmail/resendEmail.html'),
      controller: 'ResendEmailCtrl'
    })
    .when('/verify/forgotPassword', {
      template: require('./verify/forgotPassword/forgotPassword.html'),
      controller: 'ForgotPasswordCtrl'
    })
    .when('/verify/resetPassword/:id', {
      template: require('./verify/resetPassword/resetPassword.html'),
      controller: 'ResetPasswordCtrl'
    })
    .when('/verify/:id', {
      template: require('./verify/verify.html'),
      controller: 'VerifyAccountCtrl'
    })
    // .when('/signup', {
    //   template: require('./signup/signup.html'),
    //   controller: 'SignupController',
    //   controllerAs: 'vm'
    // })
    ;
}
