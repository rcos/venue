'use strict';
const angular = require('angular');
import CreateEventFormCtrl from './createEvent.controller';

export default angular.module('venueApp', [])
  .directive('createEvent', function () {
    return {
      templateUrl: 'components/eventform/create/createEvent.html',
      controller: 'CreateEventFormCtrl',
      restrict: 'E',
      scope: {
        "onSubmit": "&",
        "eventContainer": "=event"
      }, // isolated scope
      link: function (scope, element) {
        scope.loadData = function(){
        }
      }
    };
  })
  .controller('CreateEventFormCtrl', CreateEventFormCtrl)
  .name;
