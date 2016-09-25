'use strict';

describe('Service: EventInfo', function () {

  // load the service's module
  beforeEach(module('venueApp'));

  // instantiate service
  var EventInfo;
  beforeEach(inject(function (_EventInfo_) {
    EventInfo = _EventInfo_;
  }));

  it('should do something', function () {
    expect(!!EventInfo).to.be.true;
  });

});
