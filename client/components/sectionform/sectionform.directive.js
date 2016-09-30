'use strict';
const angular = require('angular');

export default angular.module('directives.sectionform', [])
  .directive('sectionform', () => {
    return {
      templateUrl: 'components/sectionform/sectionform.html',
      restrict: 'EA',
      controller: 'SectionFormController',
      link: function (scope, element, attrs) {
        scope.updating = attrs.updating;
      }
    };
  })
  .name;
