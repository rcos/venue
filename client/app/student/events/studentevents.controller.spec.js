'use strict';

describe('Controller: StudentEventsCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var StudentEventsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentEventsCtrl = $controller('StudentEventsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
