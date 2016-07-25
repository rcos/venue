'use strict';

describe('Controller: VerifystudentsCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var VerifyStudentsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VerifyStudentsCtrl = $controller('VerifyStudentsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
