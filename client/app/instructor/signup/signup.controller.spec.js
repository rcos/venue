'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var SignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
