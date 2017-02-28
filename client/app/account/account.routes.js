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
    .when('/verify/resendEmail', {
      templateUrl: './verify/resendEmail/resendEmail.html',
      controller: 'ResendEmailCtrl'
    })
    .when('/verify/forgotPassword', {
      templateUrl: './verify/forgotPassword/forgotPassword.html',
      controller: 'ForgotPasswordCtrl'
    })
    .when('/verify/resetPassword/:id', {
      templateUrl: './verify/resetPassword/resetPassword.html',
      controller: 'ResetPasswordCtrl'
    })
    .when('/verify/:id', {
      templateUrl: './verify/verify.html',
      controller: 'VerifyAccountCtrl'
    })
    .when('/signup', {
      template: require('./signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'vm'
    });
}
