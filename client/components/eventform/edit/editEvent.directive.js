'use strict';
const angular = require('angular');
import EditEventFormCtrl from './editEvent.controller';

export default angular.module('venueApp', [])
  .directive('editEvent', function () {
    return {
      templateUrl: 'components/eventform/edit/editEvent.html',
      controller: 'EditEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
      }
    };
  })
  .name;
