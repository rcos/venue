'use strict';

window._ = require('lodash');

import config from './config';
import auth from '../components/auth/auth.module';
import admin from '../app/admin/admin.module';
import constants from '../app/app.constants';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import uiRouter from 'angular-ui-router';
import main from './main';

angular.module('venueApp', [
  ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,

  config,auth,admin,constants,main,

  'ui.bootstrap',
  'validation.match',
  'ngFileUpload',
  'geolocation',
  'dibari.angular-ellipsis',
  'ui.bootstrap.datetimepicker',
  'uiGmapgoogle-maps',
  'ngCsv'
])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.22', //defaults to latest 3.X anyhow
        libraries: 'geometry,visualization,places,marker,drawing'
    });
  })
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
    $templateCache.put('window.tpl.html', '<div ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
  }])
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })
  .run(($rootScope) => {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // next is an object that is the route that we are starting to go to
      // current is an object that is the route where we are currently
      var currentPath = current && current.originalPath || "";
      var nextPath = next.originalPath;

      console.log('Starting to leave %s to go to %s', currentPath, nextPath);
    });
  })
  ;

angular.element(document)
.ready(() => {
  angular.bootstrap(document, ['venueApp'], {
    strictDi: true
  });
});
