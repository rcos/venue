'use strict';
const ngRoute = require('angular-route');

import routing from './courses.routes';
import edit from './edit';
import search from './search';
import sections from './sections';
import view from './view';

export default angular.module('venueApp.courses', ['venueApp.auth', 'venueApp.CourseFactory', ngRoute, edit, search, sections, view , 'oitozero.ngSweetAlert'])
  .config(routing)
  .name;
