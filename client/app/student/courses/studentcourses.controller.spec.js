'use strict';

describe('Controller: StudentcoursesCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var StudentcoursesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentcoursesCtrl = $controller('StudentcoursesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
