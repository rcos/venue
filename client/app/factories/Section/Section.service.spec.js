'use strict';

describe('Service: Section', function () {

  // load the service's module
  beforeEach(module('venueApp'));

  // instantiate service
  var Section;
  beforeEach(inject(function (_Section_) {
    Section = _Section_;
  }));

  it('should do something', function () {
    expect(!!Section).to.be.true;
  });

});
