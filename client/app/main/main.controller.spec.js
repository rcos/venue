'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('venueApp'));

  var scope;
  var MainController;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should... to the controller', function() {
    expect(1).to.equal(1);
  });
});
