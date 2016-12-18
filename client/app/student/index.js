'use strict';

import angular from 'angular';
const ngRoute = require('angular-route');

import routing from './student.routes';

import courses from './courses';
import dashboard from './dashboard';
import events from './events';
import profile from './profile';
import submissions from './submissions';
import upload from './upload';

export default angular.module('venueApp.student', [ngRoute, courses, dashboard, events, profile, submissions, upload
])
  .config(routing)
  .name;
