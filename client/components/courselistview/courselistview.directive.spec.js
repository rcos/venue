'use strict';

describe('Directive: courselistview', function () {

  // load the directive's module and view
  beforeEach(module('venueApp'));
  beforeEach(module('app/components/courselistview/courselistview.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it.skip('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<courselistview></courselistview>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the courselistview directive');
  }));
});
