'use strict';

describe('Service: Course', function () {

  // load the service's module
  beforeEach(module('venueApp'));

  // instantiate service
  var Course;
  beforeEach(inject(function (_Course_) {
    Course = _Course_;
  }));

  it('should do something', function () {
    expect(!!Course).to.be.true;
  });

});
