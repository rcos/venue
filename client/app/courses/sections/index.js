'use strict';
const ngRoute = require('angular-route');

import routing from './sections.routes';
import create from './create';
import edit from './edit';
import view from './view';

export default angular.module('venueApp.sections', [ngRoute, create, edit, view ])
  .config(routing)
  .name;
