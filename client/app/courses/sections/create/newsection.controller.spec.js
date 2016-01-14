'use strict';

describe('Controller: NewSectionCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var NewsectionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewsectionCtrl = $controller('NewSectionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
