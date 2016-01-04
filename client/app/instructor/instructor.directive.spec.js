'use strict';

describe('Directive: instructor', function () {

  // load the directive's module and view
  beforeEach(module('venueApp'));
  beforeEach(module('app/instructor/instructor.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<instructor></instructor>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the instructor directive');
  }));
});
