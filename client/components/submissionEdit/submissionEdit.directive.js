'use strict';
const angular = require('angular');
import {
  SubmissionEditCtrl
} from './submissionEdit.controller';
import showImage from '../showImage/showImage.directive';
import commaList from '../commaList/commaList.directive';
import pictureBanner from '../pictureBanner/pictureBanner.directive';

export default angular.module('directives.submissionEdit', [showImage, commaList, pictureBanner])
  .controller('SubmissionEditCtrl', SubmissionEditCtrl)
  .directive('submissionEdit', function () {
    return {
      template: require('./submissionEdit.html'),
      controller: 'SubmissionEditCtrl',
      scope: {
        submissionId: "="
      },
      link: function (scope, element, attrs) {
      }
    };
  })
  .name;
