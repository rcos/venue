'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/settings', {
      template: require('./settings.html'),
      controller: 'SettingsController',
      authenticate: true
    });
}
