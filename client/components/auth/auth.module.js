'use strict';

import constants from '../../app/app.constants';
import util from '../util/util.module';

export default angular.module('venueApp.auth', [
  constants,
  util,
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .name;
