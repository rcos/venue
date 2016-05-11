'use strict';

describe('Controller: SectionEditCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var CourseEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseEditCtrl = $controller('SectionEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
