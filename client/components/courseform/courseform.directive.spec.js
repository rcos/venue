'use strict';

describe('Directive: courseform', function () {

  // load the directive's module and view
  beforeEach(module('venueApp'));
  beforeEach(module('app/components/courseform/courseform.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it.skip('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<courseform></courseform>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});
