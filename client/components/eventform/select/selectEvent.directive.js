'use strict';
const angular = require('angular');
import SelectEventFormCtrl from './selectEvent.controller';

export default angular.module('directives.eventformSelect', [])
  .directive('selectEvent', function () {
    return {
      templateUrl: 'components/eventform/select/selectEvent.html',
      controller: 'SelectEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
      }
    };
  })
  .controller('SelectEventFormCtrl', SelectEventFormCtrl)
  .name;
