'use strict';

describe('Controller: NewCourseCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var NewCourseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewCourseCtrl = $controller('NewCourseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
