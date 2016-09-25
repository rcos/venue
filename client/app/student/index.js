'use strict';

import angular from 'angular';
const ngRoute = require('angular-route');

import routing from './instructor.routes';

import courses from './courses';
import dashboard from './dashboard';
import events from './events';
import profile from './profile';
import signup from './signup';
import submissions from './submissions';
import upload from './upload';

export default angular.module('venueApp.student', [ngRoute, courses, dashboard, events, profile, signup, submissions, upload
])
  .config(routing)
  .name;
