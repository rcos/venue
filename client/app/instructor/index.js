'use strict';

import angular from 'angular';
const ngRoute = require('angular-route');

import routing from './instructor.routes';

import courses from './courses';
import dashboard from './dashboard';
import events from './events';
import newcourse from './newcourse';
import newevent from './newevent';
import signup from './signup';
import studentsubmissions from './studentsubmissions';
import verifystudents from './verifystudents';

export default angular.module('venueApp.instructor', [ngRoute, courses, dashboard, events, newcourse, newevent, signup, studentsubmissions, verifystudents
])
  .config(routing)
  .name;
