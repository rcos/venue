'use strict';

describe('Service: Settings', function () {

  // load the service's module
  beforeEach(module('venueApp'));

  // instantiate service
  var Settings;
  beforeEach(inject(function (_Settings_) {
    Settings = _Settings_;
  }));

  it('should do something', function () {
    expect(!!Settings).to.be.true;
  });

});
