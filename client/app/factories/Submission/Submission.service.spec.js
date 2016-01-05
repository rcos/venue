'use strict';

describe('Service: Submission', function () {

  // load the service's module
  beforeEach(module('venueApp'));

  // instantiate service
  var Submission;
  beforeEach(inject(function (_Submission_) {
    Submission = _Submission_;
  }));

  it('should do something', function () {
    expect(!!Submission).to.be.true;
  });

});
