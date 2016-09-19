'use strict';

import constants from '../../app/app.constants';
import util from '../util/util.module';

export default angular.module('venueApp.oldauth', [
  constants,
  util,
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('oldauthInterceptor');
  })
  .name;
