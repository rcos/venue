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
    .when('/signup', {
      template: require('./signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'vm'
    });
}
