'use strict';

describe('Controller: NewEventCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var NewEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewEventCtrl = $controller('NewEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
