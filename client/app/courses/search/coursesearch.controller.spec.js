'use strict';

describe('Controller: CourseSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var CourseSearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseSearchCtrl = $controller('CourseSearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
