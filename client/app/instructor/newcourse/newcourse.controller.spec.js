'use strict';

describe('Controller: NewcourseCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var NewcourseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewcourseCtrl = $controller('NewcourseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
