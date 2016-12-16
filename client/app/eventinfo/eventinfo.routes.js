'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/eventInfo/edit/:id', {
      template: require('./edit/eventedit.html'),
      controller: 'EditEventsCtrl'
    })
    .when('/eventInfo/:id', {
      template: require('./eventInfo.html'),
      controller: 'EventInfoCtrl'
    });
}
