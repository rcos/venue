'use strict';

describe('Controller: InstructorCoursesCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var InstructorCoursesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstructorCoursesCtrl = $controller('InstructorCoursesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
