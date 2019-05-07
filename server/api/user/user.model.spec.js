'use strict';

import app from '../..';
import User from './user.model';

var user;
var genUser = function() {
  user = new User({
    provider: 'local',
    firstName: 'Fake',
    lastName: 'User',
    email: 'test@example.com',
    password: 'password'
  });
  return user;
};


describe('User Model', function() {
  before(function() {
    // Clear users before testing
    return User.removeAsync();
  });

  beforeEach(function() {
    genUser();
  });

  afterEach(() => User.removeAsync());

  it('should begin with no users', function() {
    return expect(User.findAsync({})).to
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function() {
    return expect(user.saveAsync()
      .then(function() {
        var userDup = genUser();
        return userDup.saveAsync();
      })).to.be.rejected;
  });

  describe('#getSections', function() {
    var seed = require('../../config/seed');
    beforeEach(() => seed.seed());

    it('should be able to get a seed user\'s sections', function(done) {
      User.findOneAsync({"firstName" : "Jane"}).then(function
        (user){
          user.getSectionsAsync().should.eventually.have.length(2).notify(done);
        });
    });

    it('should be able to get a seed instructor\'s sections', function(done) {
      User.findOneAsync({"firstName" : "Bob"}).then(function
        (user){
          user.getSectionsAsync().should.eventually.have.length(5).notify(done);
        });
    });
  });

  describe('#getEvents', function() {
    var seed = require('../../config/seed');
    beforeEach(() => seed.seed());

    it('should be able to get a seed user\'s events', function(done) {
      User.findOneAsync({"firstName" : "Jane"}).then((user) => {
          user.getEventsAsync({})
            .then((eventObject) => Object.keys(eventObject).map((k) => eventObject[k]))
            .should.eventually.have.length(2).notify(done);
        });
    });

    it('should be able to get a seed instructor\'s events', function(done) {
      User.findOneAsync({"firstName" : "Bob"}).then((user) => {
          user.getEventsAsync({})
            .then((eventObject) => Object.keys(eventObject).map((k) => eventObject[k]))
            .should.eventually.have.length(3).notify(done);
        });
    });
  });

  describe('#password', function() {
    beforeEach(function() {
      return user.saveAsync();
    });

    it('should authenticate user if valid', function() {
      expect(user.authenticate('password')).to.be.true;
    });

    it('should not authenticate user if invalid', function() {
      expect(user.authenticate('blah')).to.not.be.true;
    });

    it('should remain the same hash unless the password is updated', function() {
      user.name = 'Test User';
      return expect(user.saveAsync()
        .then(function(u) {
          return u.authenticate('password');
        })).to.eventually.be.true;
    });
  });

});
