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
