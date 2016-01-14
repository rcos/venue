'use strict';

angular.module('venueApp')
  .directive('sectionform', () => {
    return {
      templateUrl: 'components/sectionform/sectionform.html',
      restrict: 'EA',
      controller: 'SectionFormController',
      link: function (scope, element, attrs) {
        scope.updating = attrs.updating;
      }
    };
  });
