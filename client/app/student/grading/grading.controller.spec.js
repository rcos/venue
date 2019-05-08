'use strict';

describe('Controller: GradingCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var GradingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GradingCtrl = $controller('GradingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
