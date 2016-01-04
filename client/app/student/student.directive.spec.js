'use strict';

describe('Directive: student', function () {

  // load the directive's module and view
  beforeEach(module('venueApp'));
  beforeEach(module('app/student/student.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<student></student>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the student directive');
  }));
});
