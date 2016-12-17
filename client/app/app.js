'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
import ngCsv from 'ng-csv';

import ngMessages from 'angular-messages';
import ngValidationMatch from 'angular-validation-match';
import ngFileUpload from 'ng-file-upload';

import geolocation from 'angularjs-geolocation';
import angularEllipsis from 'angular-ellipsis';
import dateTimePicker from 'bootstrap-ui-datetime-picker';
import googleMaps from 'angular-google-maps';

import {
  routeConfig
} from './app.config';

import _CourseFactory from '../factories/Course/Course.service';
import _SettingsFactory from '../factories/Settings/Settings.service';
import _SectionEventFactory from '../factories/SectionEvent/SectionEvent.service';
import _EventInfoFactory from '../factories/EventInfo/EventInfo.service';
import _SectionFactory from '../factories/Section/Section.service';
import _SubmissionFactory from '../factories/Submission/Submission.service';

import account from './account';
import admin from './admin';
import courses from './courses';
import eventinfo from './eventinfo';
import events from './events';
import instructor from './instructor';
import student from './student';
import main from './main';

import _Auth from '../components/auth/auth.module';
import footer from '../components/footer/footer.component';
import navbar from '../components/navbar/navbar.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import config from './config';

import showImage from '../components/showImage/showImage.directive';
import modal from '../components/modal/modal.service';

import sortArrow from '../components/sortArrow/sortArrow.directive';
import commaList from '../components/commaList/commaList.directive';
import eventTitleBanner from '../components/eventTitleBanner/eventTitleBanner.directive';
import courseCard from '../components/courseCard/courseCard.directive';
import submissionview from '../components/submissionview/submissionview.directive';
import submissionCard from '../components/submissionCard/submissionCard.directive';
import sectionform from '../components/sectionform/sectionform.directive';
import eventCard from '../components/eventCard/eventCard.directive';
import courseTitleBanner from '../components/courseTitleBanner/courseTitleBanner.directive';
import courseform from '../components/courseform/courseform.directive';
import pictureBanner from '../components/pictureBanner/pictureBanner.directive';
import eventForm from '../components/eventform/eventform.module'


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

    _CourseFactory,
    _SectionEventFactory,
    _EventInfoFactory,
    _SectionFactory,
    _SubmissionFactory,

    account,
    admin,
    courses,
    eventinfo,
    events,
    instructor,
    student,
    main,

    _Auth,
    footer,
    navbar,
    constants,
    util,
    socket,
    config,

    showImage,
    modal
  ])
  .config(routeConfig)
  .config(function(uiGmapGoogleMapApiProvider) {
    'ngInject';
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBmmcjxzb-gpQ_1v49txDitZFHLW6RUlB4',
        v: '3.24', //defaults to latest 3.X anyhow
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
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['venueApp'], {
      strictDi: true
    });
  });
