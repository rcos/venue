'use strict';

/**
 * Removes server error when user updates input
 */
export default angular.module('venueApp')
  .directive('mongooseError', function() {
    console.log('doggo');
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        console.log('dog');
        
        element.on('keydown', () => ngModel.$setValidity('mongoose', true));
      }
    };
  })
  .name;
