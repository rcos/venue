'use strict';
const ngRoute = require('angular-route');

import routing from './courses.routes';
import edit from './edit';
import search from './search';
import sections from './sections';
import view from './view';

export default angular.module('venueApp.courses', ['venueApp.Course',ngRoute, edit, search, sections, view ])
  .config(routing)
  .name;
