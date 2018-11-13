'use strict';

/**
 * Removes server error when user updates input
 */
export default angular.module('ngModel')
  .directive('mongooseError', function() {
    console.log('does this eve work');
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', () => ngModel.$setValidity('mongoose', true));
      }
    };
  })
  // .name;
