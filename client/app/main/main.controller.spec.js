'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('venueApp'));
  beforeEach(module('socketMock'));

  var scope;
  var MainController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should... to the controller', function() {
    $httpBackend.flush();
  });
});
