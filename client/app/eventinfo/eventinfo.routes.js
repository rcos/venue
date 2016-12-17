'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/eventInfo/edit/:id', {
      templateUrl: 'app/eventInfo/edit/eventedit.html',
      controller: 'EditEventsCtrl'
    })
    .when('/eventInfo/:id', {
      templateUrl: 'app/eventinfo/eventinfo.html',
      controller: 'EventInfoCtrl'
    });
}
