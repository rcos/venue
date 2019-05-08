'use strict';

import angular from 'angular';
const ngRoute = require('angular-route');

import routing from './student.routes';

import courses from './courses';
import dashboard from './dashboard';
import events from './events';
import submissions from './submissions';
import upload from './upload';
import grading from './grading';

export default angular.module('venueApp.student', [ngRoute, courses, dashboard, events, submissions, upload, grading])
  .config(routing)
  .name;
