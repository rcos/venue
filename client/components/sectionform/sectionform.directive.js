'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';

import {
  SectionFormController
} from './sectionform.controller';

export default angular.module('directives.sectionform', [showImage])
  .controller('SectionFormController', SectionFormController)
  .directive('sectionform', function () {
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
