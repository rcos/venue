'use strict';

describe('Controller: NeweventCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var NeweventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NeweventCtrl = $controller('NeweventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
