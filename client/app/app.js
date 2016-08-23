'use strict';

window._ = require('lodash');

import config from './config';
import auth from '../components/auth/auth.module';
import admin from '../app/admin/admin.module';
import constants from '../app/app.constants';

angular.module('venueApp', [
  config,
  auth,
  admin,
  constants,
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'ngFileUpload',
  'geolocation',
  'dibari.angular-ellipsis',
  'ui.bootstrap.datetimepicker',
  'uiGmapgoogle-maps',
  'ngCsv'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })
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
  ;
