'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
import ngMessages from 'angular-messages';
import ngValidationMatch from 'angular-validation-match';

import ngFileUpload from 'ng-file-upload';
import geolocation from 'angularjs-geolocation';
import angularEllipsis from 'angular-ellipsis';
import dateTimePicker from 'bootstrap-ui-datetime-picker';
import googleMaps from 'angular-google-maps';
import ngCsv from 'ng-csv';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import config from './config';

import './app.less';

angular.module('venueApp', [
    ngCookies,
    ngResource, ngSanitize, 'btford.socket-io', ngRoute,
    uiBootstrap,
    ngAnimate, ngMessages, ngValidationMatch,
    ngFileUpload, ngCsv,
    //
    'geolocation',
    'dibari.angular-ellipsis',
    'ui.bootstrap.datetimepicker',
    'uiGmapgoogle-maps',
    //
     ngFileUpload,
     ngCsv,
    //
     config,
    _Auth, account, admin, navbar, footer, main, constants, socket, util
  ])
  .config(routeConfig)
  .config(function(uiGmapGoogleMapApiProvider) {
    'ngInject';
    uiGmapGoogleMapApiProvider.configure({
        v: '3.22', //defaults to latest 3.X anyhow
        libraries: 'geometry,visualization,places,marker,drawing'
    });
  })
  .run(function ($templateCache) {
    'ngInject';
    $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
    $templateCache.put('window.tpl.html', '<div ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
  })
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
    'ngInject';
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
