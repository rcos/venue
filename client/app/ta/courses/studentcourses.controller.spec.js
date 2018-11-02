'use strict';

describe('Controller: StudentCoursesCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var StudentCoursesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentCoursesCtrl = $controller('StudentCoursesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
