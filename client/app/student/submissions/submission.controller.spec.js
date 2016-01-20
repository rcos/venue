'use strict';

describe('Controller: StudentSubmissionCtrl', function () {

  // load the controller's module
  beforeEach(module('venueApp'));

  var StudentSubmissionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentSubmissionCtrl = $controller('StudentSubmissionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
