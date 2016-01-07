'use strict';

describe('Controller: CoursesCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var CoursesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoursesCtrl = $controller('CoursesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
