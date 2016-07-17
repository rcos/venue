'use strict';

angular.module('venueApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/logout', {
        name: 'logout',
        referrer: '/',
        template: '',
        controller: function($location, $route, Auth) {
          var referrer = $route.current.params.referrer ||
                          $route.current.referrer ||
                          '/';
          Auth.logout();
          $location.path(referrer);
        }
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      })
      .when('/verify/resendEmail', {
        templateUrl: 'app/account/verify/resendEmail/resendEmail.html',
        controller: 'ResendEmailCtrl'
      })
      .when('/verify/forgotPassword', {
        templateUrl: 'app/account/verify/forgotPassword/forgotPassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .when('/verify/resetPassword/:id', {
        templateUrl: 'app/account/verify/resetPassword/resetPassword.html',
        controller: 'ResetPasswordCtrl'
      })
      .when('/verify/:id', {
        templateUrl: 'app/account/verify/verify.html',
        controller: 'VerifyAccountCtrl'
      });
  })
  .run(function($rootScope, $window) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (next.name === 'logout') {
        next.referrer = $window.location.pathname;
      }
    });
  });
