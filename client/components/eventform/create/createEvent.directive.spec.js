'use strict';

describe('Directive: eventform', function () {

  // load the directive's module and view
  beforeEach(module('venueApp'));
  beforeEach(module('app/components/eventform/eventform.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it.skip('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<eventform></eventform>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the eventform directive');
  }));
});
