'use strict';

describe('Controller: CourseEditCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var CourseEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseEditCtrl = $controller('CourseEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
