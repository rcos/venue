'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('venueApp.util', [])
  .factory('Util', UtilService)
  .name;
