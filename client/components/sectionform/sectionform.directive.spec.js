'use strict';

describe('Directive: sectionform', function () {

  // load the directive's module and view
  beforeEach(module('venueApp'));
  beforeEach(module('components/sectionform/sectionform.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it.skip('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sectionform></sectionform>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the sectionform directive');
  }));
});
