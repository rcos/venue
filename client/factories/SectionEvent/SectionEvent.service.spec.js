'use strict';

describe('Service: SectionEvent', function () {

  // load the service's module
  beforeEach(module('venueApp'));

  // instantiate service
  var SectionEvent;
  beforeEach(inject(function (_SectionEvent_) {
    SectionEvent = _SectionEvent_;
  }));

  it('should do something', function () {
    expect(!!SectionEvent).to.be.true;
  });

});
