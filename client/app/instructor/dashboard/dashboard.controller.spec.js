'use strict';

describe('Controller: InstructorDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var DashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('InstructorDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
