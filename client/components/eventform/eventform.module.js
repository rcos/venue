'use strict';
// import './eventform.less';
import showImage from '../showImage/showImage.directive';

import angular from 'angular';
import {
  assignEvent
} from './assign/assignEvent.directive';
import {
  AssignEventFormCtrl
} from './assign/assignEvent.controller';
import {
  createEvent
} from './create/createEvent.directive';
import {
  CreateEventFormCtrl
} from './create/createEvent.controller';
import {
  editEvent
} from './edit/editEvent.directive';
import {
  EditEventFormCtrl
} from './edit/editEvent.controller';
import {
  selectEvent
} from './select/selectEvent.directive';
import {
  SelectEventFormCtrl
} from './select/selectEvent.controller';

export default angular.module('directives.eventform', [showImage])
  .directive('assignEvent', assignEvent)
  .controller('AssignEventFormCtrl', AssignEventFormCtrl)
  .directive('createEvent', createEvent)
  .controller('CreateEventFormCtrl', CreateEventFormCtrl)
  .directive('editEvent', editEvent)
  .controller('EditEventFormCtrl', EditEventFormCtrl)
  .directive('selectEvent', selectEvent)
  .controller('SelectEventFormCtrl', SelectEventFormCtrl)
  .name;
