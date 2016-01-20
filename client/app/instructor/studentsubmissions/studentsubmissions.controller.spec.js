'use strict';

describe('Controller: StudentSubmissionsCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var StudentSubmissionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentSubmissionsCtrl = $controller('StudentSubmissionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
