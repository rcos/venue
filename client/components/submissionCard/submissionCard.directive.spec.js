'use strict';

describe('Directive: card', function () {

  // load the directive's module and view
  beforeEach(module('venueApp'));
  beforeEach(module('components/card/card.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it.skip('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<card></card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the card directive');
  }));
});
